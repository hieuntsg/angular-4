export class CreateUserForm {

  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  serviceId: number;
  companyName: string;
  email: string;
  roleId: number;
  userType: number;


  constructor(id: number , userName: string, firstName: string, lastName: string ,
     serviceId: number , companyName: string , email: string, roleId: number , userType: string) {
  }

}
