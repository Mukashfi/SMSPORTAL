import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SmsPortalSharedModule } from 'app/shared';
import {
  SMSusersComponent,
  SMSusersDetailComponent,
  SMSusersUpdateComponent,
  SMSusersDeletePopupComponent,
  SMSusersDeleteDialogComponent,
  sMSusersRoute,
  sMSusersPopupRoute
} from './';

const ENTITY_STATES = [...sMSusersRoute, ...sMSusersPopupRoute];

@NgModule({
  imports: [SmsPortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SMSusersComponent,
    SMSusersDetailComponent,
    SMSusersUpdateComponent,
    SMSusersDeleteDialogComponent,
    SMSusersDeletePopupComponent
  ],
  entryComponents: [SMSusersComponent, SMSusersUpdateComponent, SMSusersDeleteDialogComponent, SMSusersDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsPortalSMSusersModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
