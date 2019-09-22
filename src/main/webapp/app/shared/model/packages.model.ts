export interface IPackages {
  id?: number;
  points?: number;
  price?: number;
}

export class Packages implements IPackages {
  constructor(public id?: number, public points?: number, public price?: number) {}
}
