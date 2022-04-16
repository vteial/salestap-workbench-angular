import {SafeResourceUrl} from "@angular/platform-browser";
import {prop, required} from '@rxweb/reactive-form-validators';
import {NumberIdModel} from "./core.model";

export class User extends NumberIdModel {

  static readonly STATUS_PENDING = 'pending';

  static readonly STATUS_REJECTED = 'rejected';

  static readonly KEY = 'user';

  @prop()
  email: string;

  @prop()
  mobile: string;

  @required()
  name: string;

  // @required()
  @prop()
  dob: Date;

  @prop()
  avatarUrl: string;

  avatarUrlX: SafeResourceUrl | undefined;

  status: string;

  statusRemark: string;

  statusClazz: string;

  roleId: string;

  constructor() {
    super();
  }

  static createFrom(s: any): User {
    const d = new User();

    d.id = s.id;
    d.mobile = s.mobile;
    d.name = s.name;
    d.dob = s.dob;
    d.avatarUrl = s.avatar_url;
    d.status = s.status;
    d.computeStatusClazz();
    d.roleId = s.role_id;

    return d;
  }

  computeStatusClazz(): void {
    this.statusClazz = '';
    if (this.status === User.STATUS_ACTIVE) {
      this.statusClazz = 'text-success';
    }
    if (this.status === User.STATUS_IN_ACTIVE) {
      this.statusClazz = 'text-danger';
    }
    if (this.status === User.STATUS_PENDING) {
      this.statusClazz = 'text-warning';
    }
    if (this.status === User.STATUS_REJECTED) {
      this.statusClazz = 'text-secondary';
    }
  }

}
