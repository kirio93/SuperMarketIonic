import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule,} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartaCreditoProvider } from '../providers/carta-credito/carta-credito';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { SharedServiceProvider } from '../providers/shared-service/shared-service';
import { ListProductServiceProvider } from '../providers/list-product-service/list-product-service';
import { InterceptorServiceProvider } from '../providers/interceptor-service/interceptor-service';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RegisterPage} from "../pages/register/register";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    CartaCreditoProvider,
    LoginServiceProvider,
    SharedServiceProvider,
    ListProductServiceProvider,
    InterceptorServiceProvider
  ]
})
export class AppModule {}
