import {Application} from './application';
import {PartnerType} from './partner-type';
import {Organization} from './organization';
import {AppUser} from './user';

export class AppService {
    public id: number;
    public appId: number;
    public appName?: string;
    public serviceName: string;
    public url: string;
    public location: string;
    public site: string;
    public product_family: string;
    public partnerTypeId: number;
    public oai: string;
    public startDate: Date;
    public endDate: Date;
    public monthly_price: number;
    public comments: string;
    public orgId: number;
    public orgName?: string;
    public adminId: number;
    public status: boolean;
    public active: boolean;
    private registered: number;

  constructor ( id: number , appId: number , serviceName: string , url: string, location: string ,
    site: string , product_family: string , partnerTypeId: number , oai: string , startDate: Date , endDate: Date ,
    monthly_price: number , comments: string , orgId: number , adminId: number ,  status: boolean , active: boolean, registered: number
  ) {
    this.id = id;
    this.appId = appId;
    this.serviceName = serviceName;
    this.url = url;
    this.location =  location;
    this.site = site;
    this.product_family = product_family;
    this.partnerTypeId = partnerTypeId;
    this.oai = oai;
    this.startDate = startDate;
    this.endDate = endDate;
    this.monthly_price = monthly_price;
    this.comments = comments;
    this.orgId = orgId;
    this.adminId = adminId;
    this.status = status;
    this.active = active;
    this.registered = registered;
  }


}
