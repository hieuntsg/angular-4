import { Component, ElementRef, OnInit } from '@angular/core';
import { MenubarModule, MenuItem, Menubar } from 'primeng/primeng';
import { Router } from '@angular/router';
import { AppUser } from '../../models/user';
import { CommonUtils } from '../../common/common-utils';
import { I18nService } from '../../core/i18n.service';
import * as _ from "lodash";
import {ConfirmationService} from 'primeng/components/common/api';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app.header.component.css'],
  providers: [ConfirmationService]
})
export class AppHeader implements OnInit {

  currentUser: AppUser;
  loggedIn: Boolean = false;
  fullName: String = '';
  menuLanguage:  Array<{ id: String, name: String }> = Array(
    { id : 'fr', name : 'Francaise'},
    { id : 'en', name : 'English'},
    { id : 'de', name : 'Dustche'}
  );

  constructor(
    private el: ElementRef,
    private router: Router,
    private commonUtils: CommonUtils,
    private i18nService: I18nService,
    private confirmationService: ConfirmationService
  ) { }

  // wait for the component to render completely
  ngOnInit() {

    this.fullName = sessionStorage.getItem('fullName');
    if (sessionStorage.getItem('currentUser')) { // This case used when user login to success
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.login();
    }

  }

  login() {
    this.router.navigate(['/login']);
  }

  confirmLogout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to leave this page?',
      accept: () => {
         // TODO
      },
      reject: () => {
        // TODO
      }
  });
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('role');
    this.login();
  }

  get currentLanguage(): String {
    const currentlanguage = this.i18nService.language;
    const selectedLanguage = _.filter(this.menuLanguage, function(o) { return o.id === currentlanguage; });
    if (selectedLanguage) {
      return selectedLanguage[0].name;
    }
    return '';
  }

  setLanguage(language: string, $event) {
    this.i18nService.language = language;
  }

}
