import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { TabViewModule , SharedModule , DataTableModule , EditorModule , PanelModule, MessagesModule, MenubarModule ,
  DialogModule, InputTextModule, ButtonModule , CheckboxModule, FieldsetModule, CalendarModule , TooltipModule, AutoCompleteModule ,
    DropdownModule , InputSwitchModule , MenuModule , MenuItem , InputTextareaModule, InputMaskModule , RadioButtonModule
} from 'primeng/primeng';

import { ServiceListComponent } from './service-management/service-list/service-list.component';
import { ApplicationService } from 'app/services/application.service';
import { HistoryConnectionsComponent } from './history-connections/history-connections.component';
import { CommonService } from '../../services/common.service';
import { CreateServiceComponent } from './service-management/create-service/create-service.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { DashboardComponent } from './dashboard.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { UsersOfServiceComponent } from './user-management/users-of-service/users-of-service.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { UpdateUserComponent } from './user-management/update-user/update-user.component';


@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    TabViewModule ,
    SharedModule,
    DataTableModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputSwitchModule,
    CheckboxModule,
    EditorModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    PanelModule,
    MessagesModule,
    InputMaskModule,
    CommonModule,
    MenubarModule,
    AngularDateTimePickerModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
     DashboardComponent ,
     ServiceListComponent,
     UsersOfServiceComponent,
     HistoryConnectionsComponent,
     CreateServiceComponent,
     CreateUserComponent,
     UserListComponent,
     UpdateUserComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    ApplicationService , CommonService , MessageService
  ]
})
export class DashboardModule { }
