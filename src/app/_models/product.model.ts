import {SafeResourceUrl} from "@angular/platform-browser";
import {prop, required} from '@rxweb/reactive-form-validators';
import {NumberIdModel} from "./core.model";

export class Product extends NumberIdModel {

  static readonly KEY = 'product';

  @required()
  code: string;

  @required()
  name: string;

  @prop()
  desc: string;

  @required()
  unit: number;

  @required()
  rate: number

  status: string;

  statusClazz: string;

  toRequestObject(): any {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      desc: this.desc,
      unit: this.unit,
      rate: this.rate
    };
  }

  constructor() {
    super();
  }

  static createFrom(s: any): Product {
    const d = new Product();

    d.id = s.id;
    d.code = s.code;
    d.name = s.name;
    d.desc = s.desc;
    d.unit = s.unit;
    d.rate = s.rate;
    d.computeStatusClazz();

    return d;
  }

  computeStatusClazz(): void {
    this.statusClazz = '';
    if (this.status === Product.STATUS_ACTIVE) {
      this.statusClazz = 'text-success';
    }
    if (this.status === Product.STATUS_IN_ACTIVE) {
      this.statusClazz = 'text-danger';
    }
  }

}
