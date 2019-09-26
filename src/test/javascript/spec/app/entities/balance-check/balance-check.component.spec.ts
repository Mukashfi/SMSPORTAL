/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmsPortalTestModule } from '../../../test.module';
import { BalanceCheckComponent } from 'app/entities/balance-check/balance-check.component';
import { BalanceCheckService } from 'app/entities/balance-check/balance-check.service';
import { BalanceCheck } from 'app/shared/model/balance-check.model';

describe('Component Tests', () => {
  describe('BalanceCheck Management Component', () => {
    let comp: BalanceCheckComponent;
    let fixture: ComponentFixture<BalanceCheckComponent>;
    let service: BalanceCheckService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [BalanceCheckComponent],
        providers: []
      })
        .overrideTemplate(BalanceCheckComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BalanceCheckComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BalanceCheckService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BalanceCheck(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.balanceChecks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
