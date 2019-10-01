import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Groups } from 'app/shared/model/groups.model';
import { GroupsService } from './groups.service';
import { GroupsComponent } from './groups.component';
import { GroupsDetailComponent } from './groups-detail.component';
import { GroupsUpdateComponent } from './groups-update.component';
import { GroupsDeletePopupComponent } from './groups-delete-dialog.component';
import { IGroups } from 'app/shared/model/groups.model';

@Injectable({ providedIn: 'root' })
export class GroupsResolve implements Resolve<IGroups> {
  constructor(private service: GroupsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroups> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Groups>) => response.ok),
        map((groups: HttpResponse<Groups>) => groups.body)
      );
    }
    return of(new Groups());
  }
}

export const groupsRoute: Routes = [
  {
    path: '',
    component: GroupsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'smsPortalApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GroupsDetailComponent,
    resolve: {
      groups: GroupsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GroupsUpdateComponent,
    resolve: {
      groups: GroupsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GroupsUpdateComponent,
    resolve: {
      groups: GroupsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/viewGroup',
    component: GroupsUpdateComponent,
    resolve: {
      groups: GroupsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const groupsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: GroupsDeletePopupComponent,
    resolve: {
      groups: GroupsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.groups.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
