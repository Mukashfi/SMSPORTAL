import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SmsPortalSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [SmsPortalSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [SmsPortalSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmsPortalSharedModule {
  static forRoot() {
    return {
      ngModule: SmsPortalSharedModule
    };
  }
}
