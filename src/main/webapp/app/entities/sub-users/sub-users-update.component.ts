import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISubUsers, SubUsers } from 'app/shared/model/sub-users.model';
import { SubUsersService } from './sub-users.service';

@Component({
  selector: 'jhi-sub-users-update',
  templateUrl: './sub-users-update.component.html'
})
export class SubUsersUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    username: [],
    parentUserId: [],
    isAuthrized: [],
    subUserId: [],
    userId: []
  });

  constructor(protected subUsersService: SubUsersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ subUsers }) => {
      this.updateForm(subUsers);
    });
  }

  updateForm(subUsers: ISubUsers) {
    this.editForm.patchValue({
      id: subUsers.id,
      username: subUsers.username,
      parentUserId: subUsers.parentUserId,
      isAuthrized: subUsers.isAuthrized,
      subUserId: subUsers.subUserId,
      userId: subUsers.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const subUsers = this.createFromForm();
    if (subUsers.id !== undefined) {
      this.subscribeToSaveResponse(this.subUsersService.update(subUsers));
    } else {
      this.subscribeToSaveResponse(this.subUsersService.create(subUsers));
    }
  }

  private createFromForm(): ISubUsers {
    return {
      ...new SubUsers(),
      id: this.editForm.get(['id']).value,
      username: this.editForm.get(['username']).value,
      parentUserId: this.editForm.get(['parentUserId']).value,
      isAuthrized: this.editForm.get(['isAuthrized']).value,
      subUserId: this.editForm.get(['subUserId']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubUsers>>) {
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
