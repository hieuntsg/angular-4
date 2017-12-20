export class SearchServiceForm {
  keyword: string;
  appId: number;
  orgId: number
  active: boolean;

  constructor(text: string , app_id: number , org_id: number , active: boolean) {
      this.keyword = text;
      this.appId = app_id;
      this.orgId = org_id;
      this.active = active;
  }

}
