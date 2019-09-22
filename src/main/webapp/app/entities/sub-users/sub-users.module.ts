import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SmsPortalSharedModule } from 'app/shared';
import {
  SubUsersComponent,
  SubUsersDetailComponent,
  SubUsersUpdateComponent,
  SubUsersDeletePopupComponent,
  SubUsersDeleteDialogComponent,
  subUsersRoute,
  SubUsersAdminComponent,
  subUsersPopupRoute
} from './';
const ENTITY_STATES = [...subUsersRoute, ...subUsersPopupRoute];

@NgModule({
  imports: [SmsPortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SubUsersComponent,
    SubUsersDetailComponent,
    SubUsersUpdateComponent,
    SubUsersAdminComponent,
    SubUsersDeleteDialogComponent,
    SubUsersDeletePopupComponent
  ],
  entryComponents: [
    SubUsersComponent,
    SubUsersUpdateComponent,
    SubUsersAdminComponent,
    SubUsersDeleteDialogComponent,
    SubUsersDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsPortalSubUsersModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
