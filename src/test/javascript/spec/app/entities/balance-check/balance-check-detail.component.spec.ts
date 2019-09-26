/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { BalanceCheckDetailComponent } from 'app/entities/balance-check/balance-check-detail.component';
import { BalanceCheck } from 'app/shared/model/balance-check.model';

describe('Component Tests', () => {
  describe('BalanceCheck Management Detail Component', () => {
    let comp: BalanceCheckDetailComponent;
    let fixture: ComponentFixture<BalanceCheckDetailComponent>;
    const route = ({ data: of({ balanceCheck: new BalanceCheck(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [BalanceCheckDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BalanceCheckDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BalanceCheckDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.balanceCheck).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
