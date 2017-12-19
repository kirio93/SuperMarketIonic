import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginServiceProvider} from "../../providers/login-service/login-service";
import {SharedServiceProvider} from "../../providers/shared-service/shared-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  logged = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider,  private sharedService: SharedServiceProvider) {
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
        this.navCtrl.push('page-list');
      }, (err) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.logged = true;
        this.navCtrl.push('page-home');

      });
    }
    sharedService.changeEmitted$.subscribe(text => {
      console.log(text);
      this.logged=true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
