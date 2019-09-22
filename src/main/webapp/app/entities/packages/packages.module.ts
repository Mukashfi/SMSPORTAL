import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SmsPortalSharedModule } from 'app/shared';
import {
  PackagesComponent,
  PackagesDetailComponent,
  PackagesUpdateComponent,
  PackagesDeletePopupComponent,
  PackagesDeleteDialogComponent,
  packagesRoute,
  packagesPopupRoute
} from './';

const ENTITY_STATES = [...packagesRoute, ...packagesPopupRoute];

@NgModule({
  imports: [SmsPortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PackagesComponent,
    PackagesDetailComponent,
    PackagesUpdateComponent,
    PackagesDeleteDialogComponent,
    PackagesDeletePopupComponent
  ],
  entryComponents: [PackagesComponent, PackagesUpdateComponent, PackagesDeleteDialogComponent, PackagesDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsPortalPackagesModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
