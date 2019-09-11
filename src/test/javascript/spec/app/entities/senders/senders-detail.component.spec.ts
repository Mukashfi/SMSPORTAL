/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { SendersDetailComponent } from 'app/entities/senders/senders-detail.component';
import { Senders } from 'app/shared/model/senders.model';

describe('Component Tests', () => {
  describe('Senders Management Detail Component', () => {
    let comp: SendersDetailComponent;
    let fixture: ComponentFixture<SendersDetailComponent>;
    const route = ({ data: of({ senders: new Senders(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [SendersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SendersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SendersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.senders).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
