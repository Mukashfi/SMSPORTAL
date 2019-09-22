export interface ISubUsers {
  id?: number;
  username?: string;
  parentUserId?: number;
  isAuthrized?: boolean;
  subUserId?: number;
  userId?: number;
}

export class SubUsers implements ISubUsers {
  constructor(
    public id?: number,
    public username?: string,
    public parentUserId?: number,
    public isAuthrized?: boolean,
    public subUserId?: number,
    public userId?: number
  ) {
    this.isAuthrized = this.isAuthrized || false;
  }
}
