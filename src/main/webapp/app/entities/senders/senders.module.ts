import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SmsPortalSharedModule } from 'app/shared';
import {
  SendersComponent,
  SendersDetailComponent,
  SendersUpdateComponent,
  SendersDeletePopupComponent,
  SendersDeleteDialogComponent,
  sendersRoute,
  sendersPopupRoute
} from './';

const ENTITY_STATES = [...sendersRoute, ...sendersPopupRoute];

@NgModule({
  imports: [SmsPortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SendersComponent,
    SendersDetailComponent,
    SendersUpdateComponent,
    SendersDeleteDialogComponent,
    SendersDeletePopupComponent
  ],
  entryComponents: [SendersComponent, SendersUpdateComponent, SendersDeleteDialogComponent, SendersDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsPortalSendersModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
