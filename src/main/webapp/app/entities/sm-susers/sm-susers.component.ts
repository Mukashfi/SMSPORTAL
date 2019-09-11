import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISMSusers } from 'app/shared/model/sm-susers.model';
import { AccountService } from 'app/core';
import { SMSusersService } from './sm-susers.service';

@Component({
  selector: 'jhi-sm-susers',
  templateUrl: './sm-susers.component.html'
})
export class SMSusersComponent implements OnInit, OnDestroy {
  sMSusers: ISMSusers[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sMSusersService: SMSusersService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sMSusersService
      .query()
      .pipe(
        filter((res: HttpResponse<ISMSusers[]>) => res.ok),
        map((res: HttpResponse<ISMSusers[]>) => res.body)
      )
      .subscribe(
        (res: ISMSusers[]) => {
          this.sMSusers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSMSusers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISMSusers) {
    return item.id;
  }

  registerChangeInSMSusers() {
    this.eventSubscriber = this.eventManager.subscribe('sMSusersListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
