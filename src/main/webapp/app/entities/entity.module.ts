import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.SmsPortalUsersModule)
      },
      {
        path: 'sm-susers',
        loadChildren: () => import('./sm-susers/sm-susers.module').then(m => m.SmsPortalSMSusersModule)
      },
      {
        path: 'senders',
        loadChildren: () => import('./senders/senders.module').then(m => m.SmsPortalSendersModule)
      },
      {
        path: 'packages',
        loadChildren: () => import('./packages/packages.module').then(m => m.SmsPortalPackagesModule)
      },
      {
        path: 'sub-users',
        loadChildren: () => import('./sub-users/sub-users.module').then(m => m.SmsPortalSubUsersModule)
      },
      {
        path: 'balance-check',
        loadChildren: () => import('./balance-check/balance-check.module').then(m => m.BalanceCheckModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsPortalEntityModule {}
