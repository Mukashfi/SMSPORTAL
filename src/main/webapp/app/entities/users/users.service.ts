import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsers } from 'app/shared/model/users.model';

type EntityResponseType = HttpResponse<IUsers>;
type EntityArrayResponseType = HttpResponse<IUsers[]>;

@Injectable({ providedIn: 'root' })
export class UsersService {
  public resourceUrl = SERVER_API_URL + 'api/users';

  constructor(protected http: HttpClient) {}

  create(users: IUsers): Observable<EntityResponseType> {
    return this.http.post<IUsers>(this.resourceUrl, users, { observe: 'response' });
  }

  update(users: IUsers): Observable<EntityResponseType> {
    return this.http.put<IUsers>(this.resourceUrl, users, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUsers>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUsers[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
