/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { BalanceCheckUpdateComponent } from 'app/entities/balance-check/balance-check-update.component';
import { BalanceCheckService } from 'app/entities/balance-check/balance-check.service';
import { BalanceCheck } from 'app/shared/model/balance-check.model';

describe('Component Tests', () => {
  describe('BalanceCheck Management Update Component', () => {
    let comp: BalanceCheckUpdateComponent;
    let fixture: ComponentFixture<BalanceCheckUpdateComponent>;
    let service: BalanceCheckService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [BalanceCheckUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BalanceCheckUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BalanceCheckUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BalanceCheckService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BalanceCheck(123);
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
        const entity = new BalanceCheck();
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
