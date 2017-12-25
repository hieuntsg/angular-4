import { Injectable } from '@angular/core';
import { LoginForm } from '../forms/login-form';
import { CommonService } from 'app/services/common.service';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/';
import { AppUser } from '../models/user';
import { AppService } from 'app/models/service';
import { CreateUserForm } from '../forms/create-user-form';
import { UpdateUserForm } from '../forms/update-user-form';
// Import env
import { environment } from 'environments/environment';

const API_URL = environment.serverUrl;

@Injectable()
export class UserService {

  constructor(
      private http: Http,
      private commonService: CommonService
  ) { }

  login(loginForm: string): Observable<AppUser> {
    return this.http.post(API_URL  + '/user/login' , loginForm).
        map(this.commonService.extractData).
        catch(this.commonService.handleError);
  }

  createNewUser(user: CreateUserForm , serviceId: number): Observable<boolean> {
    return this.http.put(API_URL + '/service/add-user/' + serviceId , user)
        .map(this.commonService.extractData)
            .catch(this.commonService.handleError);
  }

  getAllADUsers(): Observable<AppUser[]> {
    return this.http.get(API_URL + '/user-ad')
      .map(this.commonService.extractData).catch(this.commonService.handleError);
  }

  getAllUsers(): Observable<AppUser[]> {
    return this.http.get(API_URL + '/user')
      .map(this.commonService.extractData).catch(this.commonService.handleError);
  }

  changeUserStatus(id: number, active: boolean) {
    return this.http.get(API_URL + '/user/' + id + '/' + active)
      .map(this.commonService.extractData)
      .catch(this.commonService.handleError);
  }

  deleteUser(id: number) {
    return this.http.delete(API_URL + '/user/' + id)
      .map(this.commonService.extractData)
        .catch(this.commonService.handleError);
  }

  getUsersOfService(serviceId: number) {
    return this.http.get(API_URL + '/user/service-users/' + serviceId)
      .map(this.commonService.extractData)
        .catch(this.commonService.handleError);
  }

  searchInternalUsers(query: any) {
    return this.http.get(API_URL + '/user/search-internal' + query)
        .map(this.commonService.extractData)
            .catch(this.commonService.handleError);
  }

  updateUser(user: UpdateUserForm) {
    this.http.put(API_URL + '/user/' + user.id , user)
      .map(this.commonService.extractData)
        .catch(this.commonService.handleError);
  }

}
