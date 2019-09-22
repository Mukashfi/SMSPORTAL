export interface IAdminUsers {
  id?: number;
  points?: number;
  senderName?: string;
  isActive?: boolean;
  sMPP?: boolean;
  isTrust?: boolean;
  notes?: string;
  phone?: string;
  isMMS?: boolean;
  isHTTP?: boolean;
  adminID?: number;
  username?: string;
  parentUserId?: number;
  isAuthrized?: boolean;
  subUserId?: number;
  userId?: number;
}

export class AdminUsers implements IAdminUsers {
  constructor(
    public id?: number,
    public points?: number,
    public senderName?: string,
    public isActive?: boolean,
    public sMPP?: boolean,
    public isTrust?: boolean,
    public notes?: string,
    public phone?: string,
    public isMMS?: boolean,
    public isHTTP?: boolean,
    public adminID?: number,
    public username?: string,
    public parentUserId?: number,
    public isAuthrized?: boolean,
    public subUserId?: number,
    public userId?: number
  ) {
    this.isActive = this.isActive || false;
    this.sMPP = this.sMPP || false;
    this.isTrust = this.isTrust || false;
    this.isMMS = this.isMMS || false;
    this.isHTTP = this.isHTTP || false;
    this.isAuthrized = this.isAuthrized || false;
  }
}
