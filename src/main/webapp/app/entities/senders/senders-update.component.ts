import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISenders, Senders } from 'app/shared/model/senders.model';
import { SendersService } from './senders.service';

@Component({
  selector: 'jhi-senders-update',
  templateUrl: './senders-update.component.html'
})
export class SendersUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    senderId: [],
    userId: [],
    sender: []
  });

  constructor(protected sendersService: SendersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ senders }) => {
      this.updateForm(senders);
    });
  }

  updateForm(senders: ISenders) {
    this.editForm.patchValue({
      id: senders.id,
      senderId: senders.senderId,
      userId: senders.userId,
      sender: senders.sender
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const senders = this.createFromForm();
    if (senders.id !== undefined) {
      this.subscribeToSaveResponse(this.sendersService.update(senders));
    } else {
      this.subscribeToSaveResponse(this.sendersService.create(senders));
    }
  }

  private createFromForm(): ISenders {
    return {
      ...new Senders(),
      id: this.editForm.get(['id']).value,
      senderId: this.editForm.get(['senderId']).value,
      userId: this.editForm.get(['userId']).value,
      sender: this.editForm.get(['sender']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISenders>>) {
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
