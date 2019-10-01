import { IGroups } from 'app/shared/model/groups.model';

export interface IGroupMembers {
  id?: number;
  gourpId?: number;
  phone?: string;
  comId?: number;
  gourpmem?: IGroups;
}

export class GroupMembers implements IGroupMembers {
  constructor(public id?: number, public gourpId?: number, public phone?: string, public comId?: number, public gourpmem?: IGroups) {}
}
