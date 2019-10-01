import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IGroupMembers, GroupMembers } from 'app/shared/model/group-members.model';
import { GroupMembersService } from './group-members.service';
import { IGroups } from 'app/shared/model/groups.model';
import { GroupsService } from 'app/entities/groups';

@Component({
  selector: 'jhi-group-members-update',
  templateUrl: './group-members-update.component.html'
})
export class GroupMembersUpdateComponent implements OnInit {
  isSaving: boolean;

  groups: IGroups[];

  editForm = this.fb.group({
    id: [],
    gourpId: [],
    phone: [],
    comId: [],
    gourpmem: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected groupMembersService: GroupMembersService,
    protected groupsService: GroupsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ groupMembers }) => {
      this.updateForm(groupMembers);
    });
    this.groupsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGroups[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGroups[]>) => response.body)
      )
      .subscribe((res: IGroups[]) => (this.groups = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(groupMembers: IGroupMembers) {
    this.editForm.patchValue({
      id: groupMembers.id,
      gourpId: groupMembers.gourpId,
      phone: groupMembers.phone,
      comId: groupMembers.comId,
      gourpmem: groupMembers.gourpmem
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const groupMembers = this.createFromForm();
    if (groupMembers.id !== undefined) {
      this.subscribeToSaveResponse(this.groupMembersService.update(groupMembers));
    } else {
      this.subscribeToSaveResponse(this.groupMembersService.create(groupMembers));
    }
  }

  private createFromForm(): IGroupMembers {
    return {
      ...new GroupMembers(),
      id: this.editForm.get(['id']).value,
      gourpId: this.editForm.get(['gourpId']).value,
      phone: this.editForm.get(['phone']).value,
      comId: this.editForm.get(['comId']).value,
      gourpmem: this.editForm.get(['gourpmem']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupMembers>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackGroupsById(index: number, item: IGroups) {
    return item.id;
  }
}
