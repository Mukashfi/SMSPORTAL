import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISenders } from 'app/shared/model/senders.model';
import { AccountService } from 'app/core';
import { SendersService } from './senders.service';

@Component({
  selector: 'jhi-senders',
  templateUrl: './senders.component.html'
})
export class SendersComponent implements OnInit, OnDestroy {
  senders: ISenders[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sendersService: SendersService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sendersService
      .query()
      .pipe(
        filter((res: HttpResponse<ISenders[]>) => res.ok),
        map((res: HttpResponse<ISenders[]>) => res.body)
      )
      .subscribe(
        (res: ISenders[]) => {
          this.senders = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSenders();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISenders) {
    return item.id;
  }

  registerChangeInSenders() {
    this.eventSubscriber = this.eventManager.subscribe('sendersListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
