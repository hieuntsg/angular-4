export class UpdateUserForm {

    id: number;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    newPass: string;
    confirmPass: string;

    constructor(id: number ,  firstName: string, lastName: string ,
       companyName: string , email: string , newPass: string, confirmPass: string) {
    }

  }
