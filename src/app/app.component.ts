import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {Logger} from './core/logger.service';
import {I18nService} from './core/i18n.service';

const log = new Logger('App');

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

  }

}
