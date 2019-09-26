import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBalanceCheck } from 'app/shared/model/balance-check.model';

@Component({
  selector: 'jhi-balance-check-detail',
  templateUrl: './balance-check-detail.component.html'
})
export class BalanceCheckDetailComponent implements OnInit {
  balanceCheck: IBalanceCheck;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ balanceCheck }) => {
      this.balanceCheck = balanceCheck;
    });
  }

  previousState() {
    window.history.back();
  }
}
