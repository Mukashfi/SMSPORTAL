import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBalanceCheck } from 'app/shared/model/balance-check.model';

type EntityResponseType = HttpResponse<IBalanceCheck>;
type EntityArrayResponseType = HttpResponse<IBalanceCheck[]>;

@Injectable({ providedIn: 'root' })
export class BalanceCheckService {
  public resourceUrl = SERVER_API_URL + 'api/balance-checks';

  constructor(protected http: HttpClient) {}

  create(balanceCheck: IBalanceCheck): Observable<EntityResponseType> {
    return this.http.post<IBalanceCheck>(this.resourceUrl, balanceCheck, { observe: 'response' });
  }

  update(balanceCheck: IBalanceCheck): Observable<EntityResponseType> {
    return this.http.put<IBalanceCheck>(this.resourceUrl, balanceCheck, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBalanceCheck>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBalanceCheck[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
