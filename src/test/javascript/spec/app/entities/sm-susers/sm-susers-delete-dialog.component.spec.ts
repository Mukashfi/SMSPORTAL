/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SmsPortalTestModule } from '../../../test.module';
import { SMSusersDeleteDialogComponent } from 'app/entities/sm-susers/sm-susers-delete-dialog.component';
import { SMSusersService } from 'app/entities/sm-susers/sm-susers.service';

describe('Component Tests', () => {
  describe('SMSusers Management Delete Component', () => {
    let comp: SMSusersDeleteDialogComponent;
    let fixture: ComponentFixture<SMSusersDeleteDialogComponent>;
    let service: SMSusersService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SMSusersDeleteDialogComponent]
      })
        .overrideTemplate(SMSusersDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SMSusersDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SMSusersService);
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
