import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from './i18n.service';

export function createHttpService(backend: ConnectionBackend, defaultOptions: RequestOptions) {
  return new Http(backend, defaultOptions);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [
  ],
  providers: [
    I18nService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions],
      useFactory: createHttpService
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
