import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Senders } from 'app/shared/model/senders.model';
import { SendersService } from './senders.service';
import { SendersComponent } from './senders.component';
import { SendersDetailComponent } from './senders-detail.component';
import { SendersUpdateComponent } from './senders-update.component';
import { SendersDeletePopupComponent } from './senders-delete-dialog.component';
import { ISenders } from 'app/shared/model/senders.model';

@Injectable({ providedIn: 'root' })
export class SendersResolve implements Resolve<ISenders> {
  constructor(private service: SendersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISenders> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Senders>) => response.ok),
        map((senders: HttpResponse<Senders>) => senders.body)
      );
    }
    return of(new Senders());
  }
}

export const sendersRoute: Routes = [
  {
    path: '',
    component: SendersComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.senders.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SendersDetailComponent,
    resolve: {
      senders: SendersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.senders.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SendersUpdateComponent,
    resolve: {
      senders: SendersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.senders.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SendersUpdateComponent,
    resolve: {
      senders: SendersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.senders.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sendersPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SendersDeletePopupComponent,
    resolve: {
      senders: SendersResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.senders.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
