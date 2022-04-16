import { Component, OnInit } from '@angular/core'
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

  constructor(private notifyService: ToastrService,
    private productService: ProductApiService) {
    super();
    this.viewName = 'Products'
  }

  ngOnInit(): void {
    this.items = [] as Product[];
    this.refresh();
  }

  refresh() {
    this.productService.findAll().subscribe(res => {
      console.log(res);
//       if( res.status === 200) {
//         this.items = res.data.map(o => { return Product.from(o); });
//       } else {
//         console.log('Fetching products failed...');
//       }
    });
  }

  save() {
      this.notifyService.clear();
      console.log(this.item);
      if (!this.item.id) {
          this.productService.create(this.item).subscribe(res => {
              console.log(res);
//               if( res.status === 201) {
//                   this.refresh();
//                   this.add();
//               } else {
//                   this.message = 'Create failed...';
//                   console.log(this.message);
//               }
          });
      } else {
          this.productService.update(this.item.id, this.item).subscribe(res => {
              console.log(res);
//               if( res.status === 200) {
//                   this.refresh();
//                   this.add();
//               } else {
//                   this.message = 'Update failed...';
//                   console.log(this.message);
//               }
          });
      }
  }

  add() {
    this.item = new Product();
  }

  edit(item: Product) {
    console.log(item);
    this.item = item
    console.log(this.item);
    this.productService.findById(this.item.id).subscribe(res => {
      console.log(res);
//       if( res.status === 200) {
//           let o = Product.from(res.data);
//           this.item.id = o.id;
//           this.item.code = o.code;
//           this.item.name = o.name;
//           this.item.desc = o.desc;
//           this.item.unit = o.unit;
//           this.item.rate = o.rate;
//       } else {
//           this.message = 'Fetching product failed...';
//           console.log(this.message);
//       }
    });
  }

  remove(item: Product) {
    console.log(this.item);
    this.productService.delete(this.item.id).subscribe(res => {
      console.log(res);
//       if( res.status === 204) {
//           this.refresh();
//       } else {
//           this.message = 'Remove failed...';
//           console.log(this.message);
//       }
    });
  }

}
