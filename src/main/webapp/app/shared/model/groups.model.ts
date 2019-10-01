export interface IGroups {
  id?: number;
  groupId?: number;
  groupname?: string;
  groupdesc?: string;
  userId?: number;
}

export class Groups implements IGroups {
  constructor(public id?: number, public groupId?: number, public groupname?: string, public groupdesc?: string, public userId?: number) {}
}
