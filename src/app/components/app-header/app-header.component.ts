import { Component, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';
import { AppUser } from '../../models/user';
import { CommonUtils } from '../../common/common-utils';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeader {

  items: MenuItem[];
  navbar_items: MenuItem[];
  currentUser: AppUser;
  loggedIn: boolean;
  fullName: string;

  constructor(
    private el: ElementRef,
    private router: Router,
    private commonUtils: CommonUtils
  ) { }

  // wait for the component to render completely
  ngOnInit(): void {

    this.navbar_items = [
      {
          label: 'Francaise',
          items: [{
                  label: 'Francaise',
                  icon: 'fa-plus',
                  items: [
                      {label: 'Project'},
                      {label: 'Other'},
                  ]
              },
              {label: 'English'},
              {label: 'Dustche'}
          ]
      },
      {
          label: 'Edit',
          icon: 'fa-edit',
          items: [
              {label: 'Undo', icon: 'fa-mail-forward'},
              {label: 'Redo', icon: 'fa-mail-reply'}
          ]
      }
    ];

    this.fullName = sessionStorage.getItem('fullName');

    var nativeElement: HTMLElement = this.el.nativeElement,
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
