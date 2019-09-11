/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { SMSusersService } from 'app/entities/sm-susers/sm-susers.service';
import { ISMSusers, SMSusers } from 'app/shared/model/sm-susers.model';

describe('Service Tests', () => {
  describe('SMSusers Service', () => {
    let injector: TestBed;
    let service: SMSusersService;
    let httpMock: HttpTestingController;
    let elemDefault: ISMSusers;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(SMSusersService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new SMSusers(0, 0, 'AAAAAAA', false, false, false, 'AAAAAAA', 'AAAAAAA', false, false, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a SMSusers', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new SMSusers(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a SMSusers', async () => {
        const returnedFromService = Object.assign(
          {
            points: 1,
            senderName: 'BBBBBB',
            isActive: true,
            sMPP: true,
            isTrust: true,
            notes: 'BBBBBB',
            phone: 'BBBBBB',
            isMMS: true,
            isHTTP: true,
            adminID: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of SMSusers', async () => {
        const returnedFromService = Object.assign(
          {
            points: 1,
            senderName: 'BBBBBB',
            isActive: true,
            sMPP: true,
            isTrust: true,
            notes: 'BBBBBB',
            phone: 'BBBBBB',
            isMMS: true,
            isHTTP: true,
            adminID: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SMSusers', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
