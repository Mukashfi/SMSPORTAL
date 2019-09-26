import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BalanceCheck } from 'app/shared/model/balance-check.model';
import { BalanceCheckService } from './balance-check.service';
import { BalanceCheckComponent } from './balance-check.component';
import { BalanceCheckDetailComponent } from './balance-check-detail.component';
import { BalanceCheckUpdateComponent } from './balance-check-update.component';
import { BalanceCheckDeletePopupComponent } from './balance-check-delete-dialog.component';
import { IBalanceCheck } from 'app/shared/model/balance-check.model';

@Injectable({ providedIn: 'root' })
export class BalanceCheckResolve implements Resolve<IBalanceCheck> {
  constructor(private service: BalanceCheckService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBalanceCheck> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<BalanceCheck>) => response.ok),
        map((balanceCheck: HttpResponse<BalanceCheck>) => balanceCheck.body)
      );
    }
    return of(new BalanceCheck());
  }
}

export const balanceCheckRoute: Routes = [
  {
    path: '',
    component: BalanceCheckComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.balanceCheck.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BalanceCheckDetailComponent,
    resolve: {
      balanceCheck: BalanceCheckResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.balanceCheck.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BalanceCheckUpdateComponent,
    resolve: {
      balanceCheck: BalanceCheckResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.balanceCheck.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BalanceCheckUpdateComponent,
    resolve: {
      balanceCheck: BalanceCheckResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.balanceCheck.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const balanceCheckPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BalanceCheckDeletePopupComponent,
    resolve: {
      balanceCheck: BalanceCheckResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.balanceCheck.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
