import { Component, OnInit, Input, EventEmitter , Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { CommonService } from 'app/services/common.service';
import { Router } from '@angular/router';
import { AppUser } from '../../../../models/user';
import { ROLE_ID_PARTNER, USER_TYPE_INTERNAL, USER_TYPE_EXTERNAL } from '../../../../common/app-constants';
import { CreateUserForm } from '../../../../forms/create-user-form';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})

export class CreateUserComponent implements OnInit {

  @Input('serviceId')
  serviceId: number;

  @Input('displayCreateUserDialog')
  displayCreateUserDialog: boolean;

  @Output('showCreate')
  showCreate = new EventEmitter<boolean>();

  @Output('showServiceUsers')
  showServiceUsers = new EventEmitter<boolean>();


  submited: boolean;
  createUserForm: FormGroup;
  isCreatedSucess: boolean;
  internalChecked = true;
  externalChecked = false;
  userType: number;

  constructor(
     private userService: UserService,
     private commonService: CommonService,
     private router: Router
  ) { }

  ngOnInit() {
    this.initCreateUserForm();
  }

  initCreateUserForm() {
    this.createUserForm = new FormGroup(
      {
        'id': new FormControl(null),
        'userName': new FormControl(null),
        'userType': new FormControl(null),
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null , Validators.required),
        'companyName': new FormControl(null),
        'email': new FormControl(null, Validators.required),
        'serviceId': new FormControl(this.serviceId)
      }
    );
  }

  selectInternal(event) {
    this.externalChecked = false;
    this.internalChecked = true;
    this.userType = 1;
  }

  selectExternal(event) {
    this.internalChecked = false;
    this.externalChecked = true;
    this.userType = 2;
  }

  onSubmit(user: CreateUserForm) {

    this.submited = true;

    user.roleId = ROLE_ID_PARTNER;

    if (this.internalChecked) {
      user.userType = USER_TYPE_INTERNAL;
    } else {
      user.userType = USER_TYPE_EXTERNAL;
    }

    this.userService.createNewUser(user , this.serviceId).subscribe(
      res => {
          this.isCreatedSucess = res;
          this.createUserForm.reset();
      },
      err => {
          this.isCreatedSucess = false;
      }
    );
}

rechercherADUser() {
  this.userService.getAllADUsers().subscribe(
    data => {
      console.log(data);
    }
  );
}

showCreateDialog(show: boolean) {
    this.showCreate.emit(show);
}

closeCreateDialog() {
  this.showServiceUsers.emit(true);
}

}
