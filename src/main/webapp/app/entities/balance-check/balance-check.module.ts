import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SmsPortalSharedModule } from 'app/shared';
import {
  BalanceCheckComponent,
  BalanceCheckDetailComponent,
  BalanceCheckUpdateComponent,
  BalanceCheckDeletePopupComponent,
  BalanceCheckDeleteDialogComponent,
  balanceCheckRoute,
  balanceCheckPopupRoute
} from './';

const ENTITY_STATES = [...balanceCheckRoute, ...balanceCheckPopupRoute];

@NgModule({
  imports: [SmsPortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BalanceCheckComponent,
    BalanceCheckDetailComponent,
    BalanceCheckUpdateComponent,
    BalanceCheckDeleteDialogComponent,
    BalanceCheckDeletePopupComponent
  ],
  entryComponents: [
    BalanceCheckComponent,
    BalanceCheckUpdateComponent,
    BalanceCheckDeleteDialogComponent,
    BalanceCheckDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsPortalBalanceCheckModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
