import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginServiceProvider} from "../providers/login-service/login-service";
import {SharedServiceProvider} from "../providers/shared-service/shared-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private loginService: LoginServiceProvider,  private sharedService: SharedServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Register', component: 'page-register'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.loginService.logout().subscribe(data => {
      console.log('logged out.' + data);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }, (err) => {
      console.log('logger out. ');
      localStorage.removeItem('user');
      this.router.navigate(['login']);
      this.logged = false;
    });
  }

  isLogged(event) {
    console.log(event);
    this.logged = event;
  }

}
