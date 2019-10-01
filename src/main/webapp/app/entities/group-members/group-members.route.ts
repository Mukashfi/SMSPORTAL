import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GroupMembers } from 'app/shared/model/group-members.model';
import { GroupMembersService } from './group-members.service';
import { GroupMembersComponent } from './group-members.component';
import { GroupMembersDetailComponent } from './group-members-detail.component';
import { GroupMembersUpdateComponent } from './group-members-update.component';
import { GroupMembersDeletePopupComponent } from './group-members-delete-dialog.component';
import { IGroupMembers } from 'app/shared/model/group-members.model';

@Injectable({ providedIn: 'root' })
export class GroupMembersResolve implements Resolve<IGroupMembers> {
  constructor(private service: GroupMembersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroupMembers> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<GroupMembers>) => response.ok),
        map((groupMembers: HttpResponse<GroupMembers>) => groupMembers.body)
      );
    }
    return of(new GroupMembers());
  }
}

export const groupMembersRoute: Routes = [
  {
    path: '',
    component: GroupMembersComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'smsPortalApp.groupMembers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GroupMembersDetailComponent,
    resolve: {
      groupMembers: GroupMembersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.groupMembers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GroupMembersUpdateComponent,
    resolve: {
      groupMembers: GroupMembersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.groupMembers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GroupMembersUpdateComponent,
    resolve: {
      groupMembers: GroupMembersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.groupMembers.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const groupMembersPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: GroupMembersDeletePopupComponent,
    resolve: {
      groupMembers: GroupMembersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.groupMembers.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
