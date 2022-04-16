import {HttpParams} from '@angular/common/http';
import {compare, password, required} from '@rxweb/reactive-form-validators';

export enum EntityEvents {
  READ_LIST_NO_RECORDS,
  READ_LIST_SUCCESS,
  READ_LIST_FAILED,
  NOT_FOUND,
  READ_SUCCESS,
  READ_FAILED,
  CREATE_SUCCESS,
  CREATE_FAILED,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  DELETE_SUCCESS,
  DELETE_FAILED,
}

export abstract class Model {

  static readonly STATUS_ACTIVE = 'active';

  static readonly STATUS_IN_ACTIVE = 'in-active'

  // static fromStringToDate(dateS: string): Date {
  //   return new Date(dayjs(dateS).valueOf());
  // }

  createdBy: string;

  createdAt: Date;

  updatedBy: string;

  updatedAt: Date;

  constructor() {
  }
}

export abstract class StringIdModel extends Model {

  id: string;

}

export abstract class NumberIdModel extends Model {

  id: number;

}


export class WydRole {
  readonly GUEST = 'guest';
  readonly USER = 'user';
  readonly ADMIN = 'admin';
}

export class ResponseEvent {

  type: number;

  source: any;

  constructor(type: number, source: any) {
    this.type = type;
    this.source = source;
  }

  isError(): boolean {
    return (this.source.error)
  }

}

export class SignUpDto {

  @required()
  email: string;

  @required()
  password: string;

  // @required()
  // phone: string;

  constructor() {
  }

}

export class SignInDto {

  @required()
  email: string;

  @required()
  password: string;

  constructor() {
  }

}

export class ResetPasswordDto {

  @required()
  email: string;

  constructor() {
  }

}

export class ChangePasswordDto {

  // @password({validation: {maxLength: 10, minLength: 5, digit: true, specialCharacter: true}})
  @required()
  newPassword: string;

  @compare({fieldName: 'newPassword'})
  @required()
  confirmPassword: string;

  constructor() {
  }

}

export interface SearchCriteria {

  asHttpParams(): HttpParams;

  asHttpParamsString(): string;

}

export abstract class AbstractSearchCriteria implements SearchCriteria {

  size = 200;

  page: number;

  pages: number;

  sort: string;

  order: string;

  asHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.size) {
      httpParams = httpParams.set('size', '' + this.size);
    }
    if (this.page) {
      httpParams = httpParams.set('page', '' + this.page);
    }
    if (this.sort) {
      httpParams = httpParams.set('sort', this.sort);
    }
    if (this.order) {
      httpParams = httpParams.set('order', this.order);
    }
    return httpParams;
  }

  asHttpParamsString(): string {
    let pstring = this.asHttpParams().toString();
    if (pstring && pstring.length > 0) {
      pstring = '?' + pstring;
    }
    return pstring;
  }
}
