import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fail } from 'assert';

@Component({
  selector: 'app-app-user-condition',
  templateUrl: './app-user-condition.component.html',
  styleUrls: ['./app-user-condition.component.scss']
})
export class AppUserConditionComponent implements OnInit {

  pdfSrc: string = '../assets/user-condition-file/CGU_portail_partenaire.pdf';
  isValidationCondition: boolean = false;
  isShowErrorMessage: boolean = false;
  loggedIn: Boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('currentUser')) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  goPageServices() {
    if (this.isValidationCondition) {
      this.isShowErrorMessage = false;
      this.router.navigate(['/services']);
    } else {
      this.isShowErrorMessage = true;
    }

  }

}
