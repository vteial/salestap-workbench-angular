import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Product } from "../_models/product.model";
import { ProductApiService } from "../_common/product-api.service";
import { BaseComponent } from "../_common/base.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit {

  items: Product[];

  item: Product;

  itemFg: FormGroup;

  constructor(private notifyService: ToastrService,
    private productService: ProductApiService,
    private formBuilder: FormBuilder) {
    super();
    this.viewName = 'Products'
  }

  ngOnInit(): void {
    this.items = [] as Product[];
    this.refresh();
    this.add();
  }

  refresh(): void {
    this.productService.findAll().subscribe(data => {
      console.log(data);
      if( this.items.length > 0) this.items = [] as Product[];
      data.forEach(o => this.items.push(Product.createFrom(o)));
     });
  }

  save(): void {
      this.notifyService.clear();
      console.log(this.itemFg);
      if (this.itemFg.invalid) {
        this.notifyService.error('Please fix the error fields by providing valid values.');
        return;
      }
      console.log(this.item);
      this.item.code = this.itemFg.controls['code'].value;
      this.item.name = this.itemFg.controls['name'].value;
      this.item.unit = this.itemFg.controls['unit'].value;
      this.item.rate = this.itemFg.controls['rate'].value;
      console.log(this.item);
      if (!this.item.id) {
        this.productService.create(this.item).subscribe(data => {
          console.log(data);
          this.notifyService.success('created successfully...');
          this.refresh();
          this.add();
        });
      } else {
        this.productService.update(this.item.id, this.item).subscribe(data => {
          console.log(data);
          this.notifyService.success('updated successfully...');
          this.refresh();
          this.add();
        });
      }
  }

  add(): void {
    this.item = new Product();
    this.initForm();
  }

  edit(item: Product): void {
    this.item = item
    this.initForm();
    this.productService.findById(this.item.id).subscribe(data => {
      console.log(data);
      let o = Product.createFrom(data);
      this.item.id = o.id;
      this.item.code = o.code;
      this.item.name = o.name;
      this.item.desc = o.desc;
      this.item.unit = o.unit;
      this.item.rate = o.rate;
      this.initForm();
    });
  }

  remove(item: Product): void {
    console.log(item);
    this.productService.delete(item.id).subscribe(data => {
      console.log(data);
      this.notifyService.success('removed successfully...');
      this.refresh();
    });
  }

  private initForm(): void {
    this.itemFg = this.formBuilder.group({
      code: [this.item.code, [Validators.required]],
      name: [this.item.name, [Validators.required]],
      unit: [this.item.unit, [Validators.required]],
      rate: [this.item.rate, [Validators.required]],
    });
  }

}
