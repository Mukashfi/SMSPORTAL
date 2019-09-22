/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SmsPortalTestModule } from '../../../test.module';
import { SubUsersDeleteDialogComponent } from 'app/entities/sub-users/sub-users-delete-dialog.component';
import { SubUsersService } from 'app/entities/sub-users/sub-users.service';

describe('Component Tests', () => {
  describe('SubUsers Management Delete Component', () => {
    let comp: SubUsersDeleteDialogComponent;
    let fixture: ComponentFixture<SubUsersDeleteDialogComponent>;
    let service: SubUsersService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SubUsersDeleteDialogComponent]
      })
        .overrideTemplate(SubUsersDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubUsersDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubUsersService);
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
