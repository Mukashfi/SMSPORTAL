import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGroupMembers } from 'app/shared/model/group-members.model';

type EntityResponseType = HttpResponse<IGroupMembers>;
type EntityArrayResponseType = HttpResponse<IGroupMembers[]>;

@Injectable({ providedIn: 'root' })
export class GroupMembersService {
  public resourceUrl = SERVER_API_URL + 'api/group-members';

  constructor(protected http: HttpClient) {}

  create(groupMembers: IGroupMembers): Observable<EntityResponseType> {
    return this.http.post<IGroupMembers>(this.resourceUrl, groupMembers, { observe: 'response' });
  }

  update(groupMembers: IGroupMembers): Observable<EntityResponseType> {
    return this.http.put<IGroupMembers>(this.resourceUrl, groupMembers, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroupMembers>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroupMembers[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
