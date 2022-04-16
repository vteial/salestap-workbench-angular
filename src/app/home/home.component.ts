import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {User} from "../_models/user.model";
import {WydApiService} from "../_common/wyd-api.service";
import {BaseComponent} from "../_common/base.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  user: User;

  constructor(private toastrService: ToastrService,
              private apiService: WydApiService) {
    super();
    this.viewName = 'Home';
  }

  ngOnInit(): void {
    this.user = this.apiService.sessionUser;
  }

}
