import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AuthenticationService, AuthenticationServiceFactory} from "./services/authentication.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GoogleTagManagerModule} from "angular-google-tag-manager";
import {environment} from "../environments/environment";
import {CountUpModule} from "ngx-countup";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    GoogleTagManagerModule.forRoot({
      id: environment.googleTag
    }),
    CountUpModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AuthenticationServiceFactory,
      deps: [AuthenticationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
