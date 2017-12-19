import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginServiceProvider} from "../../providers/login-service/login-service";

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
export class RegisterPage implements OnInit {
  private user = {username:'', password:'', profileType:'ROLE_ADMIN', tel: '',
    via: '', cap: '', citta: '', prov: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService : LoginServiceProvider) {
  }
  ngOnInit() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    this.loginService.register(this.user).subscribe(data =>{
      console.log(data);
      this.navCtrl.setRoot('page-home');
    }, err=> {
      console.log(err);
    })
  }
}
