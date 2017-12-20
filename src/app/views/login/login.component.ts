import { Component , OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AppUser } from '../../models/user';
import { LoginForm } from '../../forms/login-form';
import { UserRole } from '../../models/user-role';
import { CommonUtils } from '../../common/common-utils';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

loginForm: FormGroup;
submitted: boolean;
currentUser: AppUser;
fullname: string;

constructor(
  private userService: UserService,
  private router: Router,
  private commonUtils: CommonUtils
) {}


initLoginForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
}

ngOnInit () {
  if (this.commonUtils.getCurrentUserFromSession()) {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
  }

  this.initLoginForm();
}

onSubmit(loginForm: string) {
  this.submitted = true;
  if (loginForm) {
    this.userService.login(loginForm).subscribe(
      res => {
        if (res) {
          this.currentUser = res;
          this.fullname = this.currentUser.fullName;
          sessionStorage.setItem('fullName' , this.currentUser.fullName);
          sessionStorage.setItem('currentUser' , JSON.stringify(this.currentUser));
          sessionStorage.setItem('role' , this.commonUtils.getRoleNameById(this.currentUser.roleId));
          sessionStorage.setItem('userId' , this.currentUser.id.toString());
          this.router.navigate(['/services']);
        } else {
          // show message login fail.
        }
      }
    );
  }
}

}
