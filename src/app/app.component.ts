import {DomSanitizer} from "@angular/platform-browser";
import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";

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

  userProfile: KeycloakProfile | null = null;

  userRole: string = 'Employee';

  viewName: string;

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private readonly apiService: WydApiService,
              private readonly domSanitizer: DomSanitizer,
              private readonly keycloak: KeycloakService) {

  }

  async ngOnInit() {
    let flag = await this.keycloak.isLoggedIn();
    console.log(flag);
    if (flag) {
      this.userProfile = await this.keycloak.loadUserProfile();
      if(this.keycloak.isUserInRole('wb-manager')) this.userRole = 'manager';
    }
    console.log(window.location.origin);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onActivate(baseComponent: BaseComponent): void {
    this.viewName = baseComponent.viewName;
    console.log(this.viewName);
  }

  signOut(): void {
    this.keycloak.logout(window.location.origin + '/');
  /*
    this.keycloak.logout().then((success) => {
      console.log(success);
      console.log('Successfully signed out...');
    }).catch((error) => {
      console.log(error);
    });
  */
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
