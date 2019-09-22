/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { SubUsersUpdateComponent } from 'app/entities/sub-users/sub-users-update.component';
import { SubUsersService } from 'app/entities/sub-users/sub-users.service';
import { SubUsers } from 'app/shared/model/sub-users.model';

describe('Component Tests', () => {
  describe('SubUsers Management Update Component', () => {
    let comp: SubUsersUpdateComponent;
    let fixture: ComponentFixture<SubUsersUpdateComponent>;
    let service: SubUsersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SubUsersUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SubUsersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubUsersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubUsersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubUsers(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubUsers();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
