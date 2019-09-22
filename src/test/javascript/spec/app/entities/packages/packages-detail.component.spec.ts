/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmsPortalTestModule } from '../../../test.module';
import { PackagesDetailComponent } from 'app/entities/packages/packages-detail.component';
import { Packages } from 'app/shared/model/packages.model';

describe('Component Tests', () => {
  describe('Packages Management Detail Component', () => {
    let comp: PackagesDetailComponent;
    let fixture: ComponentFixture<PackagesDetailComponent>;
    const route = ({ data: of({ packages: new Packages(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmsPortalTestModule],
        declarations: [PackagesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PackagesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PackagesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.packages).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
