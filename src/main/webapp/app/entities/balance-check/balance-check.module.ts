import { NgModule, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SmsPortalSharedModule } from 'app/shared';
import { BalanceCheckComponent, BalanceRoute } from './';

const ENTITY_STATES = [...BalanceRoute];

@NgModule({
  imports: [SmsPortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BalanceCheckComponent],
  entryComponents: [BalanceCheckComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BalanceCheckModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
