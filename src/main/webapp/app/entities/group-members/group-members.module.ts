import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SmsPortalSharedModule } from 'app/shared';
import {
  GroupMembersComponent,
  GroupMembersDetailComponent,
  GroupMembersUpdateComponent,
  GroupMembersDeletePopupComponent,
  GroupMembersDeleteDialogComponent,
  groupMembersRoute,
  groupMembersPopupRoute
} from './';

const ENTITY_STATES = [...groupMembersRoute, ...groupMembersPopupRoute];

@NgModule({
  imports: [SmsPortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    GroupMembersComponent,
    GroupMembersDetailComponent,
    GroupMembersUpdateComponent,
    GroupMembersDeleteDialogComponent,
    GroupMembersDeletePopupComponent
  ],
  entryComponents: [
    GroupMembersComponent,
    GroupMembersUpdateComponent,
    GroupMembersDeleteDialogComponent,
    GroupMembersDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsPortalGroupMembersModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
