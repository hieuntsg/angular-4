import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppUser } from 'app/models/user';
import { UpdateUserForm } from 'app/forms/update-user-form';
import { Http } from '@angular/http';
import { CommonService } from 'app/services/common.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent implements OnInit {

@Input('user')
user: AppUser;

updateUserForm: FormGroup;
isUpdateSucess: boolean;

constructor(
  private userService: UserService,
  private commonService: CommonService
) { }

ngOnInit() {
  this.initUpdateUserForm(this.user);
}

onSubmit(user: UpdateUserForm) {
  console.log(user);
  // this.userService.updateUser(user).subscribe(
  //   res => {
  //       this.isUpdateSucess = res;
  //   },
  //   err => {
  //       this.isUpdateSucess = false;
  //   }
  // );
}

initUpdateUserForm(user: AppUser) {
    this.updateUserForm = new FormGroup(
      {
        'id': new FormControl(user.id),
         // 'firstName': new FormControl(user.firstName, Validators.required),
        'lastName': new FormControl(user.lastName , Validators.required),
        'companyName': new FormControl(user.companyName),
        'email': new FormControl(user.email, Validators.required),
        'newPass': new FormControl(null),
        'confirmPass': new FormControl(null),
      }
    );
}




}
