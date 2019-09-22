/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { SubUsersDetailComponent } from 'app/entities/sub-users/sub-users-detail.component';
import { SubUsers } from 'app/shared/model/sub-users.model';

describe('Component Tests', () => {
  describe('SubUsers Management Detail Component', () => {
    let comp: SubUsersDetailComponent;
    let fixture: ComponentFixture<SubUsersDetailComponent>;
    const route = ({ data: of({ subUsers: new SubUsers(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SubUsersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SubUsersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubUsersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subUsers).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
