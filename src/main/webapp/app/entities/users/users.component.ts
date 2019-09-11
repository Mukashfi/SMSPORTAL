import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUsers } from 'app/shared/model/users.model';
import { AccountService } from 'app/core';
import { UsersService } from './users.service';

@Component({
  selector: 'jhi-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
  users: IUsers[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected usersService: UsersService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.usersService
      .query()
      .pipe(
        filter((res: HttpResponse<IUsers[]>) => res.ok),
        map((res: HttpResponse<IUsers[]>) => res.body)
      )
      .subscribe(
        (res: IUsers[]) => {
          this.users = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUsers) {
    return item.id;
  }

  registerChangeInUsers() {
    this.eventSubscriber = this.eventManager.subscribe('usersListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
