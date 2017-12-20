import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { AppUser } from '../../../../models/user';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ApplicationService } from '../../../../services/application.service';

@Component({
  selector: 'app-service-users',
  templateUrl: './users-of-service.component.html'
})
export class UsersOfServiceComponent implements OnInit {

  @Input('serviceId')
  serviceId: number;

  @Input('allUsers')
  allUsers: any;

  @Input('displayServiceUsers')
  displayServiceUsers: boolean;

  @Output('displayCreateUserDialog')
  displayCreateUserDialog = new EventEmitter<boolean>();

  @Output('displayUpdateUserDialog')
  displayUpdateUserDialog = new EventEmitter<boolean>();

  activateDialog: boolean;
  deleteDialog: boolean;
  selectedUser: AppUser;
  foundUsers: any;
  keyword: string;
  opened: boolean;

constructor(
    private http: Http,
    private router: Router,
    private userService: UserService,
    private appService: ApplicationService
) { }

ngOnInit() { }

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
  } else {
      this.activateDialog = true;
      this.selectedUser = user;
  }
}

removeUserFromService(user: AppUser , serviceId: number , confirmed: boolean) {

    let deleted: boolean;

    if (confirmed) {
          this.appService.removeUserFromService(serviceId , user.id).subscribe(
              res => {
                deleted = res;
                this.deleteDialog = false;
                if ( deleted ) {// if delete sucess
                  this.userService.getUsersOfService(serviceId).subscribe(
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

displayCreateDialog() {
  this.displayServiceUsers = false;
}


openEditUserDialog(user: AppUser) {
  this.displayServiceUsers = false;
  this.selectedUser = user;

}

searchInternalUser(event) {
  console.log('query : ' + event.query);
  this.userService.searchInternalUsers(event.query).subscribe(
    data => {
      this.foundUsers = data;
    }
  );
}


}
