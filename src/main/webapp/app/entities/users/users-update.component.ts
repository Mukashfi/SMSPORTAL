import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsers, Users } from 'app/shared/model/users.model';
import { UsersService } from './users.service';

@Component({
  selector: 'jhi-users-update',
  templateUrl: './users-update.component.html'
})
export class UsersUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    points: [],
    senderName: [],
    isActive: [],
    sMPP: [],
    isTrust: [],
    notes: [],
    phone: [],
    isMMS: [],
    isHTTP: [],
    adminID: []
  });

  constructor(protected usersService: UsersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ users }) => {
      this.updateForm(users);
    });
  }

  updateForm(users: IUsers) {
    this.editForm.patchValue({
      id: users.id,
      points: users.points,
      senderName: users.senderName,
      isActive: users.isActive,
      sMPP: users.sMPP,
      isTrust: users.isTrust,
      notes: users.notes,
      phone: users.phone,
      isMMS: users.isMMS,
      isHTTP: users.isHTTP,
      adminID: users.adminID
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const users = this.createFromForm();
    if (users.id !== undefined) {
      this.subscribeToSaveResponse(this.usersService.update(users));
    } else {
      this.subscribeToSaveResponse(this.usersService.create(users));
    }
  }

  private createFromForm(): IUsers {
    return {
      ...new Users(),
      id: this.editForm.get(['id']).value,
      points: this.editForm.get(['points']).value,
      senderName: this.editForm.get(['senderName']).value,
      isActive: this.editForm.get(['isActive']).value,
      sMPP: this.editForm.get(['sMPP']).value,
      isTrust: this.editForm.get(['isTrust']).value,
      notes: this.editForm.get(['notes']).value,
      phone: this.editForm.get(['phone']).value,
      isMMS: this.editForm.get(['isMMS']).value,
      isHTTP: this.editForm.get(['isHTTP']).value,
      adminID: this.editForm.get(['adminID']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsers>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
