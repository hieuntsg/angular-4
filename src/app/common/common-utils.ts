import {AppUser} from '../models/user';
import { JsonConvert } from 'json2typescript';



export class CommonUtils {


  SERVICE_ADMIN   = 'service administrator';
  GENERAL_ADMIN   = 'general administrator';
  PARTNER         = 'PARTNER';


  ROLE_ID_GE_ADMIN = 1;
  ROLE_ID_SV_ADMIN = 2;
  ROLE_ID_PARTNER = 3;


  currentUser: AppUser;

  constructor(
  ) { }

  getRoleNameById(roleId: number) {
      if (roleId === this.ROLE_ID_GE_ADMIN) {
        return this.GENERAL_ADMIN;
      }else if (roleId === this.ROLE_ID_PARTNER) {
        return this.PARTNER;
      }
  }

  getCurrentUserFromSession() {
    return this.convertJsonToAppUser(sessionStorage.getItem('currentUser'));
  }

  getUserRole(): string {
    return sessionStorage.getItem('role');
  }

  convertJsonToAppUser(jsonStr): AppUser {

    let user: AppUser;

    const jsonObj: object = JSON.parse(jsonStr);
    // Now you can map the json object to the TypeScript object automatically
    const jsonConvert: JsonConvert = new JsonConvert();
    user = jsonConvert.deserializeObject(jsonObj, AppUser);
    console.log(user);
    return user;
  }

  signOut() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
  }







}
