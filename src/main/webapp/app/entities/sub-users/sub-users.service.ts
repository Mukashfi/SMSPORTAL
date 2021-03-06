import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubUsers } from 'app/shared/model/sub-users.model';
import { ISMSusers } from 'app/shared/model/sm-susers.model';

type EntityResponseType = HttpResponse<ISubUsers>;
type EntityArrayResponseType = HttpResponse<ISubUsers[]>;

@Injectable({ providedIn: 'root' })
export class SubUsersService {
  public resourceUrl = SERVER_API_URL + 'api/sub-users';
  public resourcesurl = SERVER_API_URL + 'api/sm-susers';
  constructor(protected http: HttpClient) {}

  create(subUsers: ISubUsers): Observable<EntityResponseType> {
    return this.http.post<ISubUsers>(this.resourceUrl, subUsers, { observe: 'response' });
  }
  createUser(smsUsers: ISMSusers): Observable<EntityResponseType> {
    return this.http.post<ISMSusers>(this.resourcesurl, smsUsers, { observe: 'response' });
  }

  update(subUsers: ISubUsers): Observable<EntityResponseType> {
    return this.http.put<ISubUsers>(this.resourceUrl, subUsers, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubUsers>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  getID(): Observable<any> {
    console.log('Inside  ++++++++++++++++++++++');
    return this.http.get(SERVER_API_URL + 'api/account/getID', { observe: 'response' });
  }
  getpackages(): Observable<any> {
    console.log('Inside  ++++++++++++++++++++++');
    return this.http.get(SERVER_API_URL + 'api/packages/getpoints', { observe: 'response' });
  }
  getSenders(): Observable<any> {
    console.log('Inside  ++++++++++++++++++++++');
    return this.http.get(SERVER_API_URL + 'api/senders/getsenders', { observe: 'response' });
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubUsers[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
