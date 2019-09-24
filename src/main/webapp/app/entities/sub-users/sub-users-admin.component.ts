import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISMSusers, SMSusers } from 'app/shared/model/sm-susers.model';
import { SMSusersService } from 'app/entities/sm-susers/sm-susers.service';
import { IAdminUsers, AdminUsers } from 'app/shared/model/admin-users.model';
import { ISubUsers } from 'app/shared/model/sub-users.model';
import { SubUsersService } from './sub-users.service';
@Component({
  selector: 'jhi-sub-users-admin.component',
  templateUrl: './sub-users-admin.component.html'
})
export class SubUsersAdminComponent implements OnInit {
  isSaving: boolean;
  status_values: any;
  senders: any;
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
    adminID: [],
    username: [],
    parentUserId: [],
    isAuthrized: [],
    subUserId: [],
    userId: [],
    status_values: []
  });

  constructor(
    protected sMSusersService: SMSusersService,
    protected subUsersService: SubUsersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.subUsersService.getSenders().subscribe((res: HttpResponse<any>) => (this.senders = JSON.parse(res.body.data)));
    this.subUsersService.getpackages().subscribe((res: HttpResponse<any>) => (this.status_values = JSON.parse(res.body.data)));
    this.activatedRoute.data.subscribe(({ subUsers }) => {
      this.updateForm(subUsers);
    });
  }

  updateForm(subUsers: ISubUsers) {
    this.editForm.patchValue({
      id: subUsers.id,
      //  id: this.id,
      // points: adminUsers.points,
      // senderName: adminUsers.senderName,
      // isActive: adminUsers.isActive,
      // sMPP: adminUsers.sMPP,
      // isTrust: adminUsers.isTrust,
      // notes: adminUsers.notes,
      // phone: adminUsers.phone,
      // isMMS: adminUsers.isMMS,
      // isHTTP: adminUsers.isHTTP,
      // adminID: subUsers.adminID,
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
  onChangeEvent(ev) {
    console.log(ev.target.value);
  }
  save() {
    this.isSaving = true;
    const sMSusers = this.createFromForm();
    if (sMSusers.id !== undefined) {
      this.subscribeToSaveResponse(this.sMSusersService.update(sMSusers));
    } else {
      this.subscribeToSaveResponse(this.sMSusersService.create(sMSusers));
    }
  }

  private createFromForm(): ISMSusers {
    return {
      ...new SMSusers(),
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISMSusers>>) {
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
