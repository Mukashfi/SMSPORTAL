import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IGroups, Groups } from 'app/shared/model/groups.model';
import { GroupsService } from './groups.service';

@Component({
  selector: 'jhi-groups-update',
  templateUrl: './groups-update.component.html'
})
export class GroupsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    groupId: [],
    groupname: [],
    groupdesc: [],
    userId: []
  });

  constructor(protected groupsService: GroupsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ groups }) => {
      this.updateForm(groups);
    });
  }

  updateForm(groups: IGroups) {
    this.editForm.patchValue({
      id: groups.id,
      groupId: groups.groupId,
      groupname: groups.groupname,
      groupdesc: groups.groupdesc,
      userId: groups.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const groups = this.createFromForm();
    if (groups.id !== undefined) {
      this.subscribeToSaveResponse(this.groupsService.update(groups));
    } else {
      this.subscribeToSaveResponse(this.groupsService.create(groups));
    }
  }

  private createFromForm(): IGroups {
    return {
      ...new Groups(),
      id: this.editForm.get(['id']).value,
      groupId: this.editForm.get(['groupId']).value,
      groupname: this.editForm.get(['groupname']).value,
      groupdesc: this.editForm.get(['groupdesc']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroups>>) {
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
