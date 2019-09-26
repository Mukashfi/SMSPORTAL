import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBalanceCheck, BalanceCheck } from 'app/shared/model/balance-check.model';
import { BalanceCheckService } from './balance-check.service';

@Component({
  selector: 'jhi-balance-check-update',
  templateUrl: './balance-check-update.component.html'
})
export class BalanceCheckUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    user: [],
    subUser: []
  });

  constructor(protected balanceCheckService: BalanceCheckService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ balanceCheck }) => {
      this.updateForm(balanceCheck);
    });
  }

  updateForm(balanceCheck: IBalanceCheck) {
    this.editForm.patchValue({
      id: balanceCheck.id,
      user: balanceCheck.user,
      subUser: balanceCheck.subUser
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const balanceCheck = this.createFromForm();
    if (balanceCheck.id !== undefined) {
      this.subscribeToSaveResponse(this.balanceCheckService.update(balanceCheck));
    } else {
      this.subscribeToSaveResponse(this.balanceCheckService.create(balanceCheck));
    }
  }

  private createFromForm(): IBalanceCheck {
    return {
      ...new BalanceCheck(),
      id: this.editForm.get(['id']).value,
      user: this.editForm.get(['user']).value,
      subUser: this.editForm.get(['subUser']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBalanceCheck>>) {
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
