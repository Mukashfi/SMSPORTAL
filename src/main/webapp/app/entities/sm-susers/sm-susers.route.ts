import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SMSusers } from 'app/shared/model/sm-susers.model';
import { SMSusersService } from './sm-susers.service';
import { SMSusersComponent } from './sm-susers.component';
import { SMSusersDetailComponent } from './sm-susers-detail.component';
import { SMSusersUpdateComponent } from './sm-susers-update.component';
import { SMSusersDeletePopupComponent } from './sm-susers-delete-dialog.component';
import { ISMSusers } from 'app/shared/model/sm-susers.model';

@Injectable({ providedIn: 'root' })
export class SMSusersResolve implements Resolve<ISMSusers> {
  constructor(private service: SMSusersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISMSusers> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SMSusers>) => response.ok),
        map((sMSusers: HttpResponse<SMSusers>) => sMSusers.body)
      );
    }
    return of(new SMSusers());
  }
}

export const sMSusersRoute: Routes = [
  {
    path: '',
    component: SMSusersComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.sMSusers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SMSusersDetailComponent,
    resolve: {
      sMSusers: SMSusersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.sMSusers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SMSusersUpdateComponent,
    resolve: {
      sMSusers: SMSusersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.sMSusers.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SMSusersUpdateComponent,
    resolve: {
      sMSusers: SMSusersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.sMSusers.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sMSusersPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SMSusersDeletePopupComponent,
    resolve: {
      sMSusers: SMSusersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.sMSusers.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
