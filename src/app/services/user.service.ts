import { Injectable } from '@angular/core';
import { LoginForm } from '../forms/login-form';
import { CommonService } from 'app/services/common.service';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/';
import { AppUser } from '../models/user';
import { AppService } from 'app/models/service';
import { CreateUserForm } from '../forms/create-user-form';
import { UpdateUserForm } from '../forms/update-user-form';

@Injectable()
export class UserService {

  constructor(
      private http: Http,
      private commonService: CommonService
  ) { }

  login(loginForm: string): Observable<AppUser> {
    return this.http.post('http://localhost:8080/portail-partenaires/api/user/login' , loginForm).
        map(this.commonService.extractData).
        catch(this.commonService.handleError);
  }

  createNewUser(user: CreateUserForm , serviceId: number): Observable<boolean> {
    return this.http.put('http://localhost:8080/portail-partenaires/api/service/add-user/' + serviceId , user)
        .map(this.commonService.extractData)
            .catch(this.commonService.handleError);
  }

  getAllUsers(): Observable<AppUser[]> {
    return this.http.get('http://localhost:8080/portail-partenaires/api/user')
      .map(this.commonService.extractData).catch(this.commonService.handleError);
  }

  changeUserStatus(id: number, active: boolean) {
    return this.http.get('http://localhost:8080/portail-partenaires/api/user/' + id + '/' + active)
      .map(this.commonService.extractData)
      .catch(this.commonService.handleError);
  }

  deleteUser(id: number) {
    return this.http.delete('http://localhost:8080/portail-partenaires/api/user/' + id)
      .map(this.commonService.extractData)
        .catch(this.commonService.handleError);
  }

  getUsersOfService(serviceId: number) {
    return this.http.get('http://localhost:8080/portail-partenaires/api/user/service-users/' + serviceId)
      .map(this.commonService.extractData)
        .catch(this.commonService.handleError);
  }

  searchInternalUsers(query: any) {
    return this.http.get('http://localhost:8080/portail-partenaires/api/user/search-internal' + query)
        .map(this.commonService.extractData)
            .catch(this.commonService.handleError);
  }

  updateUser(user: UpdateUserForm) {
    this.http.put('http://localhost:8080/portail-partenaires/api/user/' + user.id , user)
      .map(this.commonService.extractData)
        .catch(this.commonService.handleError);
  }

}
