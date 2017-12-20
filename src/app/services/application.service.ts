import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { AppService } from 'app/models/service';
import { Http, Response } from '@angular/http';
import {CommonService} from './common.service';
import { SearchServiceForm } from '../forms/search-service-form';

@Injectable()
export class ApplicationService {

  constructor(
        private http: Http,
        private commonService: CommonService
  ) {}

  getAllServices(): Observable<AppService[]> {
        return this.http.get('http://localhost:8080/portail-partenaires/api/service')
            .map(this.commonService.extractData).catch(this.commonService.handleError);
  }

  getAllServicesByUserId(id: number): Observable<AppService[]> {
    return this.http.get('http://localhost:8080/portail-partenaires/api/service/user/' + id).
      map(this.commonService.extractData).catch(this.commonService.handleError);
  }

  getService(id: string): Observable<AppService> {
      return this.http.get('http://localhost:8080/portail-partenaires/api/service/' + id)
      .map(this.commonService.extractData).catch(this.commonService.handleError);
  }

  createNewService(service: string) {
      return this.http.post('http://localhost:8080/portail-partenaires/api/service' , service)
        .map(
          (res => {
            console.log(service);
          }
        )
      ).catch(this.commonService.handleError);
  }

  updateService(id: string , service: string) {
      return this.http.put('http://localhost:8080/portail-partenaires/api/service/' + id , service)
      .map(this.commonService.extractData).catch(this.commonService.handleError);
  }

  searchService(searchForm: SearchServiceForm) {
      return this.http.post('http://localhost:8080/portail-partenaires/api/service/search' , searchForm)
        .map(this.commonService.extractData).catch(this.commonService.handleError);
  }

  changeServiceStatus(id: number , active: boolean ) {
      return this.http.get('http://localhost:8080/portail-partenaires/api/service/activate/' + id + '/' + active)
        .map(this.commonService.extractData)
        .catch(this.commonService.handleError);
  }

  deleteService(id: number) {
      return this.http.delete('http://localhost:8080/portail-partenaires/api/service/' + id)
        .map(this.commonService.extractData)
        .catch(this.commonService.handleError);
  }

   removeUserFromService(serviceId: number , userId: number) {
    return this.http.delete('http://localhost:8080/portail-partenaires/api/service/remove-user/' + serviceId + '/' + userId)
        .map(this.commonService.extractData)
          .catch(this.commonService.handleError);
  }



}
