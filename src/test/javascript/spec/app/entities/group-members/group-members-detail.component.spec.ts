/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { GroupMembersDetailComponent } from 'app/entities/group-members/group-members-detail.component';
import { GroupMembers } from 'app/shared/model/group-members.model';

describe('Component Tests', () => {
  describe('GroupMembers Management Detail Component', () => {
    let comp: GroupMembersDetailComponent;
    let fixture: ComponentFixture<GroupMembersDetailComponent>;
    const route = ({ data: of({ groupMembers: new GroupMembers(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [GroupMembersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GroupMembersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GroupMembersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.groupMembers).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
