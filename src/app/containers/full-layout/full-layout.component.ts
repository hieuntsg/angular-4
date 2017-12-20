import { Component, OnInit } from '@angular/core';
import { BreadcrumbModule , MenuItem , MenubarModule } from 'primeng/primeng';
import { CommonUtils } from '../../common/common-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayout implements OnInit {

  items: MenuItem[];
  role: string;

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }


  constructor(
    private commonUtils: CommonUtils ,
      ) {

  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    this.role = this.commonUtils.getUserRole();
    this.items = [
      {
          label: 'File',
          items: [{
                  label: 'New',
                  icon: 'fa-plus',
                  items: [
                      {label: 'Project'},
                      {label: 'Other'},
                  ]
              },
              {label: 'Open'},
              {label: 'Quit'}
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
  }

  signOut() {
    this.commonUtils.signOut();
  }

}
