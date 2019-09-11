/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SmsPortalTestModule } from '../../../test.module';
import { SendersDeleteDialogComponent } from 'app/entities/senders/senders-delete-dialog.component';
import { SendersService } from 'app/entities/senders/senders.service';

describe('Component Tests', () => {
  describe('Senders Management Delete Component', () => {
    let comp: SendersDeleteDialogComponent;
    let fixture: ComponentFixture<SendersDeleteDialogComponent>;
    let service: SendersService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SendersDeleteDialogComponent]
      })
        .overrideTemplate(SendersDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SendersDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SendersService);
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
