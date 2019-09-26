import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBalanceCheck } from 'app/shared/model/balance-check.model';
import { BalanceCheckService } from './balance-check.service';

@Component({
  selector: 'jhi-balance-check-delete-dialog',
  templateUrl: './balance-check-delete-dialog.component.html'
})
export class BalanceCheckDeleteDialogComponent {
  balanceCheck: IBalanceCheck;

  constructor(
    protected balanceCheckService: BalanceCheckService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.balanceCheckService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'balanceCheckListModification',
        content: 'Deleted an balanceCheck'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-balance-check-delete-popup',
  template: ''
})
export class BalanceCheckDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ balanceCheck }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BalanceCheckDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.balanceCheck = balanceCheck;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/balance-check', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/balance-check', { outlets: { popup: null } }]);
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
