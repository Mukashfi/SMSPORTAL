export interface IUsers {
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
}

export class Users implements IUsers {
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
    public adminID?: number
  ) {
    this.isActive = this.isActive || false;
    this.sMPP = this.sMPP || false;
    this.isTrust = this.isTrust || false;
    this.isMMS = this.isMMS || false;
    this.isHTTP = this.isHTTP || false;
  }
}
