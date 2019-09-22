import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubUsers } from 'app/shared/model/sub-users.model';
import { SubUsersService } from './sub-users.service';
import { SubUsersComponent } from './sub-users.component';
import { SubUsersDetailComponent } from './sub-users-detail.component';
import { SubUsersUpdateComponent } from './sub-users-update.component';
import { SubUsersDeletePopupComponent } from './sub-users-delete-dialog.component';
import { ISubUsers } from 'app/shared/model/sub-users.model';
import { SubUsersAdminComponent } from './sub-users-admin.component';

@Injectable({ providedIn: 'root' })
export class SubUsersResolve implements Resolve<ISubUsers> {
  constructor(private service: SubUsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubUsers> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SubUsers>) => response.ok),
        map((subUsers: HttpResponse<SubUsers>) => subUsers.body)
      );
    }
    return of(new SubUsers());
  }
}

export const subUsersRoute: Routes = [
  {
    path: '',
    component: SubUsersComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'smsPortalApp.subUsers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SubUsersDetailComponent,
    resolve: {
      subUsers: SubUsersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.subUsers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/admin',
    component: SubUsersAdminComponent,
    resolve: {
      subUsers: SubUsersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.subUsers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SubUsersUpdateComponent,
    resolve: {
      subUsers: SubUsersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.subUsers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SubUsersUpdateComponent,
    resolve: {
      subUsers: SubUsersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.subUsers.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const subUsersPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SubUsersDeletePopupComponent,
    resolve: {
      subUsers: SubUsersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.subUsers.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
