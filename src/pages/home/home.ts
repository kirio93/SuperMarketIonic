import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginServiceProvider} from "../../providers/login-service/login-service";
import {SharedServiceProvider} from "../../providers/shared-service/shared-service";
import {Location} from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {username: '', password: '', profileType: 'ROLE_ADMIN'};
  constructor(public navCtrl: NavController, private loginService: LoginServiceProvider, private location: Location,
               private sharedService: SharedServiceProvider,) {

  }

  login() {
    this.loginService.login(this.user).subscribe(data => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', btoa(this.user.username + ':' + this.user.password));
      this.sharedService.emitChange('logged=true');
      this.navCtrl.push('page-list', {replaceUrl: true});
    }, err => {
      console.log(err);
    });
  }


}
