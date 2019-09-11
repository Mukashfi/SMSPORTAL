export interface ISenders {
  id?: number;
  senderId?: number;
  userId?: number;
  sender?: string;
}

export class Senders implements ISenders {
  constructor(public id?: number, public senderId?: number, public userId?: number, public sender?: string) {}
}
