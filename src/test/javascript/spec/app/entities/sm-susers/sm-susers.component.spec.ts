/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmsPortalTestModule } from '../../../test.module';
import { SMSusersComponent } from 'app/entities/sm-susers/sm-susers.component';
import { SMSusersService } from 'app/entities/sm-susers/sm-susers.service';
import { SMSusers } from 'app/shared/model/sm-susers.model';

describe('Component Tests', () => {
  describe('SMSusers Management Component', () => {
    let comp: SMSusersComponent;
    let fixture: ComponentFixture<SMSusersComponent>;
    let service: SMSusersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SMSusersComponent],
        providers: []
      })
        .overrideTemplate(SMSusersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SMSusersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SMSusersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SMSusers(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sMSusers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
