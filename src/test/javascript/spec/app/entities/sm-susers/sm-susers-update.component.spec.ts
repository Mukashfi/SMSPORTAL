/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { SMSusersUpdateComponent } from 'app/entities/sm-susers/sm-susers-update.component';
import { SMSusersService } from 'app/entities/sm-susers/sm-susers.service';
import { SMSusers } from 'app/shared/model/sm-susers.model';

describe('Component Tests', () => {
  describe('SMSusers Management Update Component', () => {
    let comp: SMSusersUpdateComponent;
    let fixture: ComponentFixture<SMSusersUpdateComponent>;
    let service: SMSusersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SMSusersUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SMSusersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SMSusersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SMSusersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SMSusers(123);
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
        const entity = new SMSusers();
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
