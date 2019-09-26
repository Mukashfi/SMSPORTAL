/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SmsPortalTestModule } from '../../../test.module';
import { BalanceCheckDeleteDialogComponent } from 'app/entities/balance-check/balance-check-delete-dialog.component';
import { BalanceCheckService } from 'app/entities/balance-check/balance-check.service';

describe('Component Tests', () => {
  describe('BalanceCheck Management Delete Component', () => {
    let comp: BalanceCheckDeleteDialogComponent;
    let fixture: ComponentFixture<BalanceCheckDeleteDialogComponent>;
    let service: BalanceCheckService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [BalanceCheckDeleteDialogComponent]
      })
        .overrideTemplate(BalanceCheckDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BalanceCheckDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BalanceCheckService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
