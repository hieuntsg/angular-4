import { SplitButtonModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// Import containers
import {
  FullLayout,
  SimpleLayout
} from './containers';

const APP_CONTAINERS = [
  FullLayout,
  SimpleLayout
]

/// Import components
import {
  AppAside,
  AppBreadcrumbs,
  AppFooter,
  AppHeaderComponent,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer
} from './components';

const APP_COMPONENTS = [
  AppAside,
  AppBreadcrumbs,
  AppFooter,
  AppHeaderComponent,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './views/login/login.component';
import { UserService } from './services/user.service';
import { CommonService } from 'app/services/common.service';
import { CommonUtils } from './common/common-utils';
import { ServiceListComponent } from './views/dashboard/service-management/service-list/service-list.component';
import {CoreModule} from './core/core.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SplitButtonModule,
    CoreModule,
    TranslateModule.forRoot()
  ],
  exports : [CommonModule],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    LoginComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA ],
  providers: [
      UserService,
      CommonService,
      CommonUtils
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
