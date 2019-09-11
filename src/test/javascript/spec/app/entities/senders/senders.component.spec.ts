/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmsPortalTestModule } from '../../../test.module';
import { SendersComponent } from 'app/entities/senders/senders.component';
import { SendersService } from 'app/entities/senders/senders.service';
import { Senders } from 'app/shared/model/senders.model';

describe('Component Tests', () => {
  describe('Senders Management Component', () => {
    let comp: SendersComponent;
    let fixture: ComponentFixture<SendersComponent>;
    let service: SendersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SendersComponent],
        providers: []
      })
        .overrideTemplate(SendersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SendersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SendersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Senders(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.senders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
