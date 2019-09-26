import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBalanceCheck } from 'app/shared/model/balance-check.model';
import { AccountService } from 'app/core';
import { BalanceCheckService } from './balance-check.service';

@Component({
  selector: 'jhi-balance-check',
  templateUrl: './balance-check.component.html'
})
export class BalanceCheckComponent implements OnInit, OnDestroy {
  balanceChecks: IBalanceCheck[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected balanceCheckService: BalanceCheckService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.balanceCheckService
      .query()
      .pipe(
        filter((res: HttpResponse<IBalanceCheck[]>) => res.ok),
        map((res: HttpResponse<IBalanceCheck[]>) => res.body)
      )
      .subscribe(
        (res: IBalanceCheck[]) => {
          this.balanceChecks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBalanceChecks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBalanceCheck) {
    return item.id;
  }

  registerChangeInBalanceChecks() {
    this.eventSubscriber = this.eventManager.subscribe('balanceCheckListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
