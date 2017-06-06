import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/loginService';
import { CreateAccountPage } from '../create-account/create-account';
import { OffersListPage } from '../offers-list/offers-list';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
    createAccountPage = CreateAccountPage;

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
      console.log(this.form.value);
      this.loginService.connect(this.form.value).subscribe(
        result => {
               this.navCtrl.push(OffersListPage);
        },
        error => {

        }
          );
  }

}
