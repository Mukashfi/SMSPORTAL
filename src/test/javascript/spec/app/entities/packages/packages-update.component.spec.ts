/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { PackagesUpdateComponent } from 'app/entities/packages/packages-update.component';
import { PackagesService } from 'app/entities/packages/packages.service';
import { Packages } from 'app/shared/model/packages.model';

describe('Component Tests', () => {
  describe('Packages Management Update Component', () => {
    let comp: PackagesUpdateComponent;
    let fixture: ComponentFixture<PackagesUpdateComponent>;
    let service: PackagesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [PackagesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PackagesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PackagesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PackagesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Packages(123);
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
        const entity = new Packages();
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
