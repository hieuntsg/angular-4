import { Component, ElementRef, OnInit } from '@angular/core';
import { MenubarModule, MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';
import { AppUser } from '../../models/user';
import { CommonUtils } from '../../common/common-utils';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  items: MenuItem[];
  dataLanguage: MenuItem[];
  currentUser: AppUser;
  loggedIn: boolean;
  fullName: string;
  test1: String;

  constructor(
    private el: ElementRef,
    private router: Router,
    private commonUtils: CommonUtils
  ) { }

  // wait for the component to render completely
  ngOnInit() {
    this.fullName = sessionStorage.getItem('fullName');
    this.dataLanguage = [
      {
        label: 'Francaise',
        icon: 'fa-plus'
      },
      {
          label: 'English',
          icon: 'fa-edit'
      },
      {
        label: 'Dustche',
        icon: 'fa-edit'
      }
    ];


    const nativeElement: HTMLElement = this.el.nativeElement,
    parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);

  if (sessionStorage.getItem('currentUser')) {
      this.loggedIn = true;
      this.items = [
        {label: 'Logout', icon: 'fa fa-sign-out fa-lg mt-2', command: () => {
          this.logout();
        }}
      ];
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);
    }


  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
