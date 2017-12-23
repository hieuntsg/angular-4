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

}

initUpdateUserForm(user: AppUser) {
    this.updateUserForm = new FormGroup(
      {
        'id': new FormControl(null),
        'firstName': new FormControl(null),
        'lastName': new FormControl(null),
        'companyName': new FormControl(null),
        'email': new FormControl(null),
        'newPass': new FormControl(null),
        'confirmPass': new FormControl(null),
      }
    );
}




}
