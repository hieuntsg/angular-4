import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { AppUser } from '../../../../models/user';
import { CommonService } from 'app/services/common.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  allUsers: any;
  activateDialog: boolean;
  deleteDialog: boolean;


  statuses: SelectItem[];
  allRoles: SelectItem[];
  userTypes: SelectItem[];


  selectedActive: any;
  selectedRole: any;
  selectedUser: AppUser;
  selectedType: any;

constructor(
    private http: Http,
    private router: Router,
    private userService: UserService,
    private commonService: CommonService
) { }

ngOnInit() {
  this.getAllUsers();
  this.initActiveDropDown();
  this.initRolesDropDown();
  this.initUserRoles();
}

getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.allUsers = data;
      }
    );
}

activate(user: AppUser, confirmed: boolean) {

  let activated: number;
  let newStatus: boolean;

  if (user.active) {
    newStatus = false;
  } else {
    newStatus = true;
  }

  if (confirmed) {
      this.userService.changeUserStatus(user.id , newStatus).subscribe(
                res => {
                  activated = res;
                  this.activateDialog = false;
                  if ( activated === 1 ) {// if delete sucess
                    this.userService.getAllUsers().subscribe(
                      data => {
                        this.allUsers = data;
                      }
                    );
                  }
                }
            );
            console.log(activated);
      } else {
            this.activateDialog = true;
            this.selectedUser = user;
      }
  }

deleteUser(user: AppUser , confirmed: boolean) {

        let deleted: boolean;

        if (confirmed) {
          this.userService.deleteUser(user.id).subscribe(
              res => {
                deleted = res;
                this.deleteDialog = false;
                if ( deleted ) {// if delete sucess
                  this.userService.getAllUsers().subscribe(
                    data => {
                      this.allUsers = data;
                    }
                  );
                }
              }
          );
        } else {
          this.deleteDialog = true;
          this.selectedUser = user;
        }
}


initActiveDropDown() {
    const states = this.commonService.getStatues();
    this.statuses = this.commonService.loadDropdownData(
          states ,
          'All' ,
          'value',
          'title'
    );
}

initRolesDropDown() {
    const roles = this.commonService.getUserRoles();
    this.allRoles = this.commonService.loadDropdownData(
          roles ,
          'All' ,
          'value',
          'title'
    );
}

initUserRoles() {
    const types = this.commonService.getAllUserTypes();
    this.userTypes = this.commonService.loadDropdownData(
      types ,
      'All' ,
      'value',
      'title'
    );
}
}
