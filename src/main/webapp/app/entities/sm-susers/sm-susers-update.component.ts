import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISMSusers, SMSusers } from 'app/shared/model/sm-susers.model';
import { SMSusersService } from './sm-susers.service';

@Component({
  selector: 'jhi-sm-susers-update',
  templateUrl: './sm-susers-update.component.html'
})
export class SMSusersUpdateComponent implements OnInit {
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

  constructor(protected sMSusersService: SMSusersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sMSusers }) => {
      this.updateForm(sMSusers);
    });
  }

  updateForm(sMSusers: ISMSusers) {
    this.editForm.patchValue({
      id: sMSusers.id,
      points: sMSusers.points,
      senderName: sMSusers.senderName,
      isActive: sMSusers.isActive,
      sMPP: sMSusers.sMPP,
      isTrust: sMSusers.isTrust,
      notes: sMSusers.notes,
      phone: sMSusers.phone,
      isMMS: sMSusers.isMMS,
      isHTTP: sMSusers.isHTTP,
      adminID: sMSusers.adminID
    });
  }

  previousState() {
    window.history.back();
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
