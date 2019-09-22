import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubUsers } from 'app/shared/model/sub-users.model';
import { SubUsersService } from './sub-users.service';

@Component({
  selector: 'jhi-sub-users-delete-dialog',
  templateUrl: './sub-users-delete-dialog.component.html'
})
export class SubUsersDeleteDialogComponent {
  subUsers: ISubUsers;

  constructor(protected subUsersService: SubUsersService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.subUsersService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'subUsersListModification',
        content: 'Deleted an subUsers'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sub-users-delete-popup',
  template: './sub-users-delete-dialog.component.html'
})
export class SubUsersDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subUsers }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SubUsersDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.subUsers = subUsers;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sub-users', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sub-users', { outlets: { popup: null } }]);
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
