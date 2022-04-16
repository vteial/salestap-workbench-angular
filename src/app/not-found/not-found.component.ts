import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {BaseComponent} from '../_common/base.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private location: Location) {
    super();
    super.viewName = 'Not Found';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.appService.setCurrentViewName(this.viewName);
  }

  historyBack(): void {
    this.location.back();
  }

}
