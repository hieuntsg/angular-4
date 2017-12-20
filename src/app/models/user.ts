import { JsonObject, JsonProperty } from 'json2typescript';

import {UserRole} from './user-role';

@JsonObject
export class AppUser {

  id?: number;

  userName: string;

  fullName: string;

  firstName: string;

  lastName: string;

  companyName: string;

  email: string;

  password?;

  roleId?: number;

  active: boolean;

  serviceAdministrator: boolean;

  generalAdministrator: boolean;

  userType: number;

  constructor() {}



}
