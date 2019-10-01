/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { GroupMembersUpdateComponent } from 'app/entities/group-members/group-members-update.component';
import { GroupMembersService } from 'app/entities/group-members/group-members.service';
import { GroupMembers } from 'app/shared/model/group-members.model';

describe('Component Tests', () => {
  describe('GroupMembers Management Update Component', () => {
    let comp: GroupMembersUpdateComponent;
    let fixture: ComponentFixture<GroupMembersUpdateComponent>;
    let service: GroupMembersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [GroupMembersUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GroupMembersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupMembersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupMembersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupMembers(123);
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
        const entity = new GroupMembers();
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
