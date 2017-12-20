import { Component, OnInit , AfterViewInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message, SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ParamMap, Router,  ActivatedRoute} from '@angular/router';
import { Application } from '../../../../models/application';
import { Organization } from '../../../../models/organization';
import { AppUser } from '../../../../models/user';
import { PartnerType } from '../../../../models/partner-type';
import { ApplicationService } from 'app/services/application.service';
import { AppService } from 'app/models/service';
import { CommonUtils } from '../../../../common/common-utils';
import { SERVICE_CREATED_SUCESS } from '../../../../common/message-constants';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
  providers: [DatePipe]
})
export class CreateServiceComponent implements OnInit {

  applications: SelectItem[];
  organizations: SelectItem[];
  users: SelectItem[];
  services: SelectItem[];
  partnerTypes: SelectItem[];

  selectedApp: number;
  selectedOrg: number;
  selectedService: AppService;
  selectedUser: AppUser;
  selectedType: PartnerType;

  service: AppService;
  startDate: any;
  endDate: any;
  submitted: boolean;

  isCreated: boolean;
  createdMsg: Message[] = [];

  createServiceForm: FormGroup;
  id: string;
  isUpdating: boolean;
  nameChangeLog: string[] = [];
  panelTitle: string;
  role: string;
  settings: any;


  @ViewChild('startDateCal')
  startDateCal: any;

  @ViewChild('endDateCal')
  endDateCal: any;

  // array of message to be display on invalid form
  serviceNameMsg: Message[] = [];


  constructor(
    private commonService: CommonService,
    private appService: ApplicationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private commonUtils: CommonUtils,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.role = this.commonUtils.getUserRole();
    this.initAppDropdown();
    this.initOrganizationDropDown();
    this.initPartnerTypeDropDown();
    this.initServiceForm();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.panelTitle = 'Update service';
      this.isUpdating = true;


      this.appService.getService(this.id).subscribe(
        res => {
          this.service = res;

          if (this.commonUtils.getUserRole() === 'partner') {
            this.initDisabledServiceForm(this.service);
          }else {
            this.initUpdateServiceForm(this.service);
          }
        },
        err => {
          console.log(err);
        }
      );

    } else {
      this.panelTitle = 'Create new service';
    }
}


initServiceForm() {
    const currentDate = new Date();
    this.createServiceForm = new FormGroup(
      {
        'id': new FormControl(0, Validators.required),
        'serviceName': new FormControl(null, Validators.required),
        'appId': new FormControl(null , Validators.required),
        'url': new FormControl(null, Validators.required),
        'location': new FormControl(null),
        'site': new FormControl(null),
        'product_family': new FormControl(null),
        'partnerTypeId': new FormControl(null, Validators.required),
        'oai': new FormControl(null , Validators.required),
        'startDate': new FormControl(currentDate, Validators.required),
        'endDate': new FormControl(currentDate  , Validators.required),
        'monthly_price': new FormControl(null, Validators.required),
        'comments': new FormControl(null),
        'orgId': new FormControl(null, Validators.required),
        'adminId': new FormControl(null),
        'status': new FormControl(true),
        'active': new FormControl(true)
      }
    );
}

  initUpdateServiceForm(updatedService: AppService) {

      this.createServiceForm.controls['id'].disable();
      this.createServiceForm.controls['id'].setValue(updatedService.id);
      this.createServiceForm.controls['serviceName'].setValue(updatedService.serviceName);
      this.createServiceForm.controls['appId'].setValue(updatedService.appId);
      this.createServiceForm.controls['url'].setValue(updatedService.url);
      this.createServiceForm.controls['location'].setValue(updatedService.location);
      this.createServiceForm.controls['site'].setValue(updatedService.site);
      this.createServiceForm.controls['partnerTypeId'].setValue(updatedService.partnerTypeId);
      this.createServiceForm.controls['oai'].setValue(updatedService.oai);
      this.createServiceForm.controls['monthly_price'].setValue(updatedService.monthly_price);
      this.createServiceForm.controls['partnerTypeId'].setValue(updatedService.partnerTypeId);
      this.createServiceForm.controls['orgId'].setValue(updatedService.orgId);
      this.createServiceForm.controls['status'].setValue(updatedService.status);
      this.createServiceForm.controls['comments'].setValue(updatedService.comments);
      this.createServiceForm.controls['active'].setValue(updatedService.active);
      this.createServiceForm.controls['startDate'].setValue(updatedService.startDate);
      this.createServiceForm.controls['endDate'].setValue(updatedService.endDate);
  }

  initDisabledServiceForm(updatedService: AppService) {
    this.createServiceForm.controls['id'].disable();
    this.createServiceForm.controls['id'].setValue(updatedService.id);
    this.createServiceForm.controls['serviceName'].disable();
    this.createServiceForm.controls['serviceName'].setValue(updatedService.serviceName);
    this.createServiceForm.controls['appId'].setValue(updatedService.appId);
    this.createServiceForm.controls['appId'].disable();
    this.createServiceForm.controls['url'].setValue(updatedService.url);
    this.createServiceForm.controls['url'].disable();
    this.createServiceForm.controls['location'].setValue(updatedService.location);
    this.createServiceForm.controls['location'].disable();
    this.createServiceForm.controls['site'].setValue(updatedService.site);
    this.createServiceForm.controls['site'].disable();
    this.createServiceForm.controls['product_family'].setValue(updatedService.product_family);
    this.createServiceForm.controls['product_family'].disable();
    this.createServiceForm.controls['partnerTypeId'].setValue(updatedService.partnerTypeId);
    this.createServiceForm.controls['partnerTypeId'].disable();
    this.createServiceForm.controls['oai'].setValue(updatedService.oai);
    this.createServiceForm.controls['oai'].disable();
    this.createServiceForm.controls['startDate'].setValue(updatedService.startDate);
    this.createServiceForm.controls['startDate'].disable();
    this.createServiceForm.controls['endDate'].setValue(updatedService.endDate);
    this.createServiceForm.controls['endDate'].disable();
    this.createServiceForm.controls['monthly_price'].setValue(updatedService.monthly_price);
    this.createServiceForm.controls['monthly_price'].disable();
    this.createServiceForm.controls['partnerTypeId'].setValue(updatedService.partnerTypeId);
    this.createServiceForm.controls['partnerTypeId'].disable();
    this.createServiceForm.controls['orgId'].setValue(updatedService.orgId);
    this.createServiceForm.controls['orgId'].disable();
    this.createServiceForm.controls['adminId'].setValue(updatedService.adminId);
    this.createServiceForm.controls['adminId'].disable();
    this.createServiceForm.controls['status'].setValue(updatedService.status);
    this.createServiceForm.controls['status'].disable();
    this.createServiceForm.controls['active'].setValue(updatedService.status);
    this.createServiceForm.controls['active'].disable();
    this.createServiceForm.controls['comments'].setValue(updatedService.comments);
    this.createServiceForm.controls['comments'].disable();
    this.createServiceForm.controls['startDate'].setValue(this.datePipe.transform(updatedService.startDate, 'dd/mm/yyyy'));
    this.createServiceForm.controls['startDate'].disable();
    this.createServiceForm.controls['endDate'].setValue(this.datePipe.transform(updatedService.endDate, 'dd/mm/yyyy'));
    this.createServiceForm.controls['endDate'].disable();
}

  onSubmit(updatedService: string) {

    console.log('submited service:' , updatedService);
    this.submitted = true;
    if (!this.isUpdating) {
      this.appService.createNewService(updatedService).subscribe(
        res => {
            this.isCreated = true;
            this.router.navigate(['/services']);
        },
        err => {
            this.isCreated = false;
        }
      );
    } else {
        // get new values from FORM
        this.appService.updateService(this.id, updatedService).subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/services']);
          },
          err => {
            console.log('update fail:' , err);
          }
        );
    }
}

  validateForm(): boolean {
    if (!this.createServiceForm.controls['serviceName'].valid || this.createServiceForm.controls['serviceName'].dirty) {
      this.serviceNameMsg.push({severity: 'error', summary: 'Error Message', detail: 'Validation failed'});
      return false;
    }

  }

  cancel() {
    this.router.navigate(['/services']);
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

  openCalendar(event: any) {
    this.startDateCal.showOverlay(this.startDateCal.inputfieldViewChild.nativeElement);
    event.stopPropagation();
  }

}
