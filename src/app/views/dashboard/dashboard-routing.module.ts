import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateServiceComponent } from './service-management/create-service/create-service.component';
import { ServiceListComponent } from './service-management/service-list/service-list.component';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { UsersOfServiceComponent } from './user-management/users-of-service/users-of-service.component';
import { UserListComponent } from './user-management/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceListComponent,
    data: {
      title: 'Gérer les services'
    }
  },
  {
    path: 'service-users',
    component: UsersOfServiceComponent
  }
  ,
  {
    path: 'users',
    component: UserListComponent,
    data: {
      title: 'Gérer les users'
    }
  },
  {
    path: 'services',
    component: ServiceListComponent,
    data: {
      title: 'Gérer les uses'
    }
  },

  {
    path: 'services/create-service',
    component: CreateServiceComponent,
    data: {
      title: 'Ajouter un service '
    }
  },
  {
    path: 'services/update-service/:id',
    component: CreateServiceComponent,
    data: {
      title: 'Modifier un service '
    }
  },
  {
    path: 'service-users/create-user',
    component: CreateUserComponent,
    data: {
      title: 'Create un service '
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
