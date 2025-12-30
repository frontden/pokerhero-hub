import { User } from '@ph-hub/common';

export class UsersStateModel {
    public user: User = null;
}

export const defaults = new UsersStateModel();
