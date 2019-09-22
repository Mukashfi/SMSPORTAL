import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ISubUsers } from 'app/shared/model/sub-users.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { SubUsersService } from './sub-users.service';

@Component({
  selector: 'jhi-sub-users',
  templateUrl: './sub-users.component.html'
})
export class SubUsersComponent implements OnInit, OnDestroy {
  Id: any;
  currentAccount: any;
  subUsers: ISubUsers[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  state = false;
  constructor(
    protected subUsersService: SubUsersService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.subUsersService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ISubUsers[]>) => this.paginateSubUsers(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/sub-users'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/sub-users',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    console.log('DDDDDD ' + this.getID());
    this.accountService.identity().then(account => {
      this.currentAccount = account;
      this.Id = this.getID();
    });
    this.registerChangeInSubUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISubUsers) {
    return item.id;
  }

  registerChangeInSubUsers() {
    this.eventSubscriber = this.eventManager.subscribe('subUsersListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  setActive(user, isAuthrized) {
    user.isAuthrized = isAuthrized;
    console.log('isAuthrized' + isAuthrized);
    this.subUsersService.update(user).subscribe(response => {
      if (response.status === 200) {
        this.error = null;
        this.success = 'OK';
        this.loadAll();
      } else {
        this.success = null;
        this.error = 'ERROR';
      }
    });
  }
  protected paginateSubUsers(data: ISubUsers[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.subUsers = data;
  }
  getID() {
    console.log('before getID');
    this.subUsersService.getID().subscribe((res: HttpResponse<any>) => (this.Id = res.body.data));
  }
  //  AssignData(ID: any) {
  //   this.Id = ID;
  //   console.log('inside assign  ' + this.Id);
  // }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
  isAllowed = (optional, op) => {
    console.log(String(optional) === String(op));
    return String(optional) === String(op) ? true : false;
  };
}
