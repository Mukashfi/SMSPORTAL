import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Packages } from 'app/shared/model/packages.model';
import { PackagesService } from './packages.service';
import { PackagesComponent } from './packages.component';
import { PackagesDetailComponent } from './packages-detail.component';
import { PackagesUpdateComponent } from './packages-update.component';
import { PackagesDeletePopupComponent } from './packages-delete-dialog.component';
import { IPackages } from 'app/shared/model/packages.model';

@Injectable({ providedIn: 'root' })
export class PackagesResolve implements Resolve<IPackages> {
  constructor(private service: PackagesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPackages> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Packages>) => response.ok),
        map((packages: HttpResponse<Packages>) => packages.body)
      );
    }
    return of(new Packages());
  }
}

export const packagesRoute: Routes = [
  {
    path: '',
    component: PackagesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'smsPortalApp.packages.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PackagesDetailComponent,
    resolve: {
      packages: PackagesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.packages.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PackagesUpdateComponent,
    resolve: {
      packages: PackagesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.packages.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PackagesUpdateComponent,
    resolve: {
      packages: PackagesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.packages.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const packagesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PackagesDeletePopupComponent,
    resolve: {
      packages: PackagesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smsPortalApp.packages.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
