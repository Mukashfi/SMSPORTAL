import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPackages } from 'app/shared/model/packages.model';

type EntityResponseType = HttpResponse<IPackages>;
type EntityArrayResponseType = HttpResponse<IPackages[]>;

@Injectable({ providedIn: 'root' })
export class PackagesService {
  public resourceUrl = SERVER_API_URL + 'api/packages';

  constructor(protected http: HttpClient) {}

  create(packages: IPackages): Observable<EntityResponseType> {
    return this.http.post<IPackages>(this.resourceUrl, packages, { observe: 'response' });
  }

  update(packages: IPackages): Observable<EntityResponseType> {
    return this.http.put<IPackages>(this.resourceUrl, packages, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPackages>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPackages[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
