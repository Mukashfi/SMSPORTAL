import { Routes } from '@angular/router';
import { BalanceCheckComponent } from './balance-check.component';

export const accountState: Routes = [
  {
    path: 'register',
    component: BalanceCheckComponent,
    data: {
      authorities: [],
      pageTitle: 'CheckBalance.title'
    }
  }
];
