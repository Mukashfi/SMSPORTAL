import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SmsPortalSharedModule } from 'app/shared';
import {
  GroupsComponent,
  GroupsDetailComponent,
  GroupsUpdateComponent,
  GroupsDeletePopupComponent,
  GroupsDeleteDialogComponent,
  groupsRoute,
  groupsPopupRoute
} from './';

const ENTITY_STATES = [...groupsRoute, ...groupsPopupRoute];

@NgModule({
  imports: [SmsPortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [GroupsComponent, GroupsDetailComponent, GroupsUpdateComponent, GroupsDeleteDialogComponent, GroupsDeletePopupComponent],
  entryComponents: [GroupsComponent, GroupsUpdateComponent, GroupsDeleteDialogComponent, GroupsDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsPortalGroupsModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
