import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { AppService } from 'app/models/service';
import { SelectItem, MenuItem, DataTable } from 'primeng/primeng';
import { CommonService } from 'app/services/common.service';
import { Router } from '@angular/router';
import { Application } from '../../../../models/application';
import { Organization } from '../../../../models/organization';
import { SearchServiceForm } from '../../../../forms/search-service-form';
import { routes } from '../../../../app.routing';
import { ApplicationService } from 'app/services/application.service';
import { AppUser } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { CommonUtils } from '../../../../common/common-utils';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { UsersOfServiceComponent } from '../../user-management/users-of-service/users-of-service.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  dataSource: any;
  allServices: any;

  usersOfService: any;

  services: SelectItem[];
  applications: SelectItem[];
  organizations: SelectItem[];
  users: SelectItem[];
  partnerTypes: SelectItem[];
  statuses: SelectItem[];

  selectedApp: Application;
  selectedOrg: Organization;
  selectedService: AppService;
  selectedActive: any;



  searchForm: SearchServiceForm;
  loading: boolean;
  id: number;
  isServiceList: boolean;
  location: string;
  deleteDialog: boolean;
  activateDialog: boolean
  displayServiceUsers: boolean;

  confirmed: boolean;

  currentUser: AppUser;
  role: string;
  userId: number;

  serviceName: string;

  serviceUsersComp: UsersOfServiceComponent;
  displayCreateUserDialog: boolean;
  displayEditUserDialog: boolean;


  constructor(
    private appService: ApplicationService,
    private commonService: CommonService,
    private userService: UserService,
    private router: Router,
    private commonUtils: CommonUtils
  ) {}

  ngOnInit() {
    this.userId = Number.parseInt(sessionStorage.getItem('userId'));
    this.getAllServices();
    this.initAppDropdown();
    this.initOrganizationDropDown();
    this.initActiveDropDown();
    this.role = this.getUserRole();
    this.id = 0;
  }

  getAllServices() {
    this.appService.getAllServicesByUserId(this.userId).subscribe(data => {
        this.allServices = data;
    });
  }

  initAppDropdown() {
    this.commonService.getAllApplications().subscribe(
      res =>  {
        this.applications = this.commonService.loadDropdownData(
          res ,
          'Choisir une application' ,
          'id',
          'name');
      }
    );
  }

  initOrganizationDropDown() {
    this.commonService.getOrganizations().subscribe(
      res => {
        this.organizations = this.commonService.loadDropdownData(
          res ,
          'Choisir une organisation' ,
          'id',
          'name'
        );
      }
    );
  }

  initPartnerTypeDropDown() {
    this.commonService.getPartnerTypes().subscribe(
      res => {
        this.partnerTypes = this.commonService.loadDropdownData(
          res ,
          'Sélectionnez le type de partenaire' ,
          'id',
          'typeName'
        );
      }
    );
  }

  initActiveDropDown() {
    const states = this.commonService.getStatues();
    this.statuses = this.commonService.loadDropdownData(
          states ,
          'Selectionner un statut' ,
          'value',
          'title'
    );
  }


  searchService(text: string , appId: number , orgId: number , active: boolean) {
    console.log(this.selectedActive);
    if (!text && !appId && !orgId) {
      this.getAllServices();
    } else {
      const searchForm = new SearchServiceForm(text , appId, orgId , active);
      console.log('search :' , searchForm);
      this.appService.searchService(searchForm).subscribe(
        data => {
          this.allServices = data;
        }
      );
    }
  }

activate(service: AppService, confirmed: boolean) {

        let activated: number;

        if (service.active === true) {
          service.active = false
        } else {
          service.active = true;
        }

        if (confirmed) {
          this.appService.changeServiceStatus(service.id , service.active).subscribe(
              res => {
                activated = res;
                this.activateDialog = false;
                if ( activated === 1 ) {// if delete sucess
                  this.appService.getAllServices().subscribe(
                    data => {
                      this.allServices = data;
                    }
                  );
                }
              }
          );
          console.log(activated);
        } else {
          this.activateDialog = true;
          this.selectedService = service;
      }
}

update(service: AppService) {
    this.router.navigateByUrl('/services/update-service/' + service.id);
}

delete(service: AppService , confirmed: boolean) {

    let deleted: boolean;

    if (confirmed) {
      this.appService.deleteService(service.id).subscribe(
          res => {
            deleted = res;
            this.deleteDialog = false;
            if ( deleted ) {// if delete sucess
              this.appService.getAllServices().subscribe(
                data => {
                  this.allServices = data;
                }
              );
            }
          }
      );
    } else {
      this.deleteDialog = true;
      this.selectedService = service;
    }
}

getUserRole(): string {
    return sessionStorage.getItem('role');
}

lazyLoadServices(event: LazyLoadEvent) {
    setTimeout(() => {
      if (this.dataSource) {
          this.allServices = this.dataSource.slice(event.first, (event.first + event.rows));
      }
    }, 250);
}


displayUsersOfService(service: AppService) {
   this.getAllUsersOfService(service);
   this.displayServiceUsers = true;
}

getAllUsersOfService(service: AppService) {
  this.serviceName = service.serviceName;
  this.userService.getUsersOfService(service.id).subscribe(
    data => {
      this.usersOfService = data;
      this.selectedService = service;
      this.id = service.id;
      this.displayServiceUsers = true;
    }
  );
}

openCreateDialog(open: boolean) {
  this.displayCreateUserDialog = open;
}

showServiceUsers(show: boolean) {
  this.displayServiceUsers = show;
  this.displayCreateUserDialog = !show;
}

updateUser(user: AppUser) {
  console.log(user);
  this.showServiceUsers(false);
  this.displayEditUserDialog = true;
}


}

