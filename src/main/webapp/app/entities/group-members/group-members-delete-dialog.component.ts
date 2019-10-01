import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroupMembers } from 'app/shared/model/group-members.model';
import { GroupMembersService } from './group-members.service';

@Component({
  selector: 'jhi-group-members-delete-dialog',
  templateUrl: './group-members-delete-dialog.component.html'
})
export class GroupMembersDeleteDialogComponent {
  groupMembers: IGroupMembers;

  constructor(
    protected groupMembersService: GroupMembersService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.groupMembersService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'groupMembersListModification',
        content: 'Deleted an groupMembers'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-group-members-delete-popup',
  template: ''
})
export class GroupMembersDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ groupMembers }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(GroupMembersDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.groupMembers = groupMembers;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/group-members', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/group-members', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
