import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../_common/base.component";

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent extends BaseComponent  implements OnInit {

  constructor() {
    super();
    this.viewName = 'Sign Out'
  }

  ngOnInit(): void {
  }

}
