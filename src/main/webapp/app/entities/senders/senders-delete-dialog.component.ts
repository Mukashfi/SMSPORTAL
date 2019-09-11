import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISenders } from 'app/shared/model/senders.model';
import { SendersService } from './senders.service';

@Component({
  selector: 'jhi-senders-delete-dialog',
  templateUrl: './senders-delete-dialog.component.html'
})
export class SendersDeleteDialogComponent {
  senders: ISenders;

  constructor(protected sendersService: SendersService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sendersService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sendersListModification',
        content: 'Deleted an senders'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-senders-delete-popup',
  template: ''
})
export class SendersDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ senders }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SendersDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.senders = senders;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/senders', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/senders', { outlets: { popup: null } }]);
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
