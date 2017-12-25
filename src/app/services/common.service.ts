import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { Http, Response } from '@angular/http';
import { SelectItem } from 'primeng/primeng';
// Import env
import { environment } from 'environments/environment';

const API_URL = environment.serverUrl;

@Injectable()
export class CommonService {

  items: SelectItem[];
  services: SelectItem[];
  applications: SelectItem[];
  organizations: SelectItem[];
  users: SelectItem[];
  partnerTypes: SelectItem[];


  constructor(
    private http: Http
  ) {

  }

  /**
   *
   *
   * @returns
   * @memberof CommonService
   */
  loadDropdownData(data: any[] , defaul: string , valueId: string, valueName: string) {
    this.items = [];
    this.items.push({label: defaul, value: 0});

    for ( let i = 0; i < data.length; i++ ) {
      this.items.push(
        {
          label: data[i][valueName],
          value: data[i][valueId]
        }
      );
    }
    return this.items;
  }

  getServicesNames() {
    return this.http.get(API_URL + '/service/names')
      .map(this.extractData)
      .catch(this.handleError);
  }
  getAllApplications() {
    return this.http.get(API_URL + '/application')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getOrganizations() {
    return this.http.get(API_URL + '/organization')
      .map(this.extractData).catch(this.handleError);
  }

  getUsers() {
    return this.http.get(API_URL + '/user')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPartnerTypes() {
    return this.http.get(API_URL + '/partner_type')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStatues(): any[] {
    const statuses = [];
    statuses.push({'value' : '1' , 'title' : 'Active'});
    statuses.push({'value' : '2' , 'title' : 'Inactive'});
    return statuses;
  }

  getUserRoles(): any[]  {
    const roles = [];
    roles.push({'value' : '1' , 'title' : 'General Administrator'});
    roles.push({'value' : '2' , 'title' : 'Service Administrator'});
    roles.push({'value' : '3' , 'title' : 'Service Manager'});
    roles.push({'value' : '4' , 'title' : 'Partner'});
    return roles;
  }

  getAllUserTypes(): any[]  {
    const types = [];
    types.push({'value' : '1' , 'title' : 'Internal'});
    types.push({'value' : '1' , 'title' : 'External'});
    return types;
  }


  extractData(res: Response) {
     return res.json();
  }

  handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
  }

}
