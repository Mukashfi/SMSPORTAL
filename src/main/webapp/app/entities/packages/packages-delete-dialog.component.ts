import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPackages } from 'app/shared/model/packages.model';
import { PackagesService } from './packages.service';

@Component({
  selector: 'jhi-packages-delete-dialog',
  templateUrl: './packages-delete-dialog.component.html'
})
export class PackagesDeleteDialogComponent {
  packages: IPackages;

  constructor(protected packagesService: PackagesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.packagesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'packagesListModification',
        content: 'Deleted an packages'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-packages-delete-popup',
  template: ''
})
export class PackagesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ packages }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PackagesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.packages = packages;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/packages', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/packages', { outlets: { popup: null } }]);
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
