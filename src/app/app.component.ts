import {DomSanitizer} from "@angular/platform-browser";
import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReactiveFormConfig} from "@rxweb/reactive-form-validators";
import {User} from "./_models/user.model";
import {WydApiService} from "./_common/wyd-api.service";
import {BaseComponent} from "./_common/base.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  appTitle = 'Workbench Angular';

  appDescription = "Angular Playground"

  sessionUser: User = this.apiService.sessionUser;

  viewName: string;

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private readonly apiService: WydApiService,
              private readonly domSanitizer: DomSanitizer) {
    ReactiveFormConfig.set({
      validationMessage: {
        required: 'This field is required.',
        alpha: 'This should have only alphabets and spaces.',
        minLength: 'This should have minimum of {{0}} characters.',
        password: 'This should satisfy the above condition.',
        compare: 'This should match with another field'
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onActivate(baseComponent: BaseComponent): void {
    this.viewName = baseComponent.viewName;
    console.log(this.viewName);
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }

}
