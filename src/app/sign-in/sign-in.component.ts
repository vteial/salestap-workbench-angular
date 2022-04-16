import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../_common/base.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends BaseComponent implements OnInit {

    constructor() {
      super();
      this.viewName = 'Sign In'
    }

    ngOnInit(): void {
    }

}
