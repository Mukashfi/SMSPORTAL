/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SmsPortalTestModule } from '../../../test.module';
import { PackagesDeleteDialogComponent } from 'app/entities/packages/packages-delete-dialog.component';
import { PackagesService } from 'app/entities/packages/packages.service';

describe('Component Tests', () => {
  describe('Packages Management Delete Component', () => {
    let comp: PackagesDeleteDialogComponent;
    let fixture: ComponentFixture<PackagesDeleteDialogComponent>;
    let service: PackagesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [PackagesDeleteDialogComponent]
      })
        .overrideTemplate(PackagesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PackagesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PackagesService);
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
