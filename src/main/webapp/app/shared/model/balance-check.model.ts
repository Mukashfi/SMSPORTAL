export interface IBalanceCheck {
  id?: number;
  user?: string;
  subUser?: string;
}

export class BalanceCheck implements IBalanceCheck {
  constructor(public id?: number, public user?: string, public subUser?: string) {}
}
