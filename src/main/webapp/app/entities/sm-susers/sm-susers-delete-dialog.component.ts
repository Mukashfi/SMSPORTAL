import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISMSusers } from 'app/shared/model/sm-susers.model';
import { SMSusersService } from './sm-susers.service';

@Component({
  selector: 'jhi-sm-susers-delete-dialog',
  templateUrl: './sm-susers-delete-dialog.component.html'
})
export class SMSusersDeleteDialogComponent {
  sMSusers: ISMSusers;

  constructor(protected sMSusersService: SMSusersService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sMSusersService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sMSusersListModification',
        content: 'Deleted an sMSusers'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sm-susers-delete-popup',
  template: ''
})
export class SMSusersDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sMSusers }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SMSusersDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sMSusers = sMSusers;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sm-susers', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sm-susers', { outlets: { popup: null } }]);
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
