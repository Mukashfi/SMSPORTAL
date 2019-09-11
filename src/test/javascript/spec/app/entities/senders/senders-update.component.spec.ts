/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { SendersUpdateComponent } from 'app/entities/senders/senders-update.component';
import { SendersService } from 'app/entities/senders/senders.service';
import { Senders } from 'app/shared/model/senders.model';

describe('Component Tests', () => {
  describe('Senders Management Update Component', () => {
    let comp: SendersUpdateComponent;
    let fixture: ComponentFixture<SendersUpdateComponent>;
    let service: SendersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SendersUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SendersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SendersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SendersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Senders(123);
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
        const entity = new Senders();
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
