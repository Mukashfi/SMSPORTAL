import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISenders } from 'app/shared/model/senders.model';

type EntityResponseType = HttpResponse<ISenders>;
type EntityArrayResponseType = HttpResponse<ISenders[]>;

@Injectable({ providedIn: 'root' })
export class SendersService {
  public resourceUrl = SERVER_API_URL + 'api/senders';

  constructor(protected http: HttpClient) {}

  create(senders: ISenders): Observable<EntityResponseType> {
    return this.http.post<ISenders>(this.resourceUrl, senders, { observe: 'response' });
  }

  update(senders: ISenders): Observable<EntityResponseType> {
    return this.http.put<ISenders>(this.resourceUrl, senders, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISenders>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISenders[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
