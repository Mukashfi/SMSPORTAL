import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISMSusers } from 'app/shared/model/sm-susers.model';

type EntityResponseType = HttpResponse<ISMSusers>;
type EntityArrayResponseType = HttpResponse<ISMSusers[]>;

@Injectable({ providedIn: 'root' })
export class SMSusersService {
  public resourceUrl = SERVER_API_URL + 'api/sm-susers';

  constructor(protected http: HttpClient) {}

  create(sMSusers: ISMSusers): Observable<EntityResponseType> {
    return this.http.post<ISMSusers>(this.resourceUrl, sMSusers, { observe: 'response' });
  }

  update(sMSusers: ISMSusers): Observable<EntityResponseType> {
    return this.http.put<ISMSusers>(this.resourceUrl, sMSusers, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISMSusers>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISMSusers[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
