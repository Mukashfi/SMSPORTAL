/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { SMSusersDetailComponent } from 'app/entities/sm-susers/sm-susers-detail.component';
import { SMSusers } from 'app/shared/model/sm-susers.model';

describe('Component Tests', () => {
  describe('SMSusers Management Detail Component', () => {
    let comp: SMSusersDetailComponent;
    let fixture: ComponentFixture<SMSusersDetailComponent>;
    const route = ({ data: of({ sMSusers: new SMSusers(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SMSusersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SMSusersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SMSusersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sMSusers).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
