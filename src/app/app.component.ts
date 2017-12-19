import { Component, ViewChild } from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
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
  logged = false;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public navCtrl: NavController, private loginService: LoginServiceProvider, private sharedService: SharedServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Register', component: 'page-register'}
    ];
    let userLogged = localStorage.getItem('user');
    if (userLogged != null) {
      this.logged = true;
      let token: string[] = atob(localStorage.getItem('token')).split(':');
      let user = {username: token[0], password: token[1]};
      this.loginService.login(user).subscribe(data => {
        console.log('logged' + data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', btoa(user.username + ':' + user.password));
        this.logged = true;
        this.navCtrl.setRoot('page-list');
      }, (err) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.logged = false;
        this.navCtrl.setRoot('page-home');

      });
    }
    sharedService.changeEmitted$.subscribe(text => {
      console.log(text);
      this.logged=true;
    });
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
      this.navCtrl.setRoot('page-home');
    }, (err) => {
      console.log('logger out. ');
      localStorage.removeItem('user');
      this.navCtrl.setRoot('page-home');
      this.logged = false;
    });
  }

  isLogged(event) {
    console.log(event);
    this.logged = event;
  }

}
