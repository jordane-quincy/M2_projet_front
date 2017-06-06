import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/loginService';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

    form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private loginService: LoginService) {
      this.form = fb.group({
                            email: fb.control('', [Validators.required, Validators.email, Validators.pattern(".*@(univ-valenciennes.fr|etu.univ-valenciennes.fr)")]),
                            password: fb.control('', [Validators.required])
                        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
      LoginService.login('http://www.google.fr', this.form.value);
  }

}
