import { BalanceCheckComponent } from './balance-check.component';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PackagesResolve {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {}
}
export const BalanceRoute: Routes = [
  {
    path: 'balance-check',
    component: BalanceCheckComponent,
    data: {
      authorities: [],
      pageTitle: 'CheckBalance.title'
    }
  }
];
