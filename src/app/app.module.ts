import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { ProductListComponent } from './product-list/product-list.component';

let hostname = window.location.hostname;
// hostname = 'workbench-angularjs.vercel.app';
hostname = hostname.replace(/\./gi, '_');
hostname = hostname.replace(/\-/gi, '_');
console.log('hostname: ' + hostname);
console.log(environment.keycloak[hostname]);

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak[hostname].url,
        realm: environment.keycloak[hostname].realm,
        clientId: environment.keycloak[hostname].clientId,
      },
      initOptions: {
//        onLoad: 'login-required'
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      },
      bearerExcludedUrls: ['/assets']
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignOutComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
