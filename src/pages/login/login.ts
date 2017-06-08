import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService, ToastService, TokenService, LoaderService, UserService } from '../../providers/index';
import { CreateAccountPage } from '../create-account/create-account';
import { ForgottenPasswordPage } from '../forgotten-password/forgotten-password';
import { TabsPage } from '../tabs/tabs';
import * as _ from 'lodash';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  createAccountPage = CreateAccountPage;
  forgottenPasswordPage = ForgottenPasswordPage;

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private authService: AuthService, private toastService: ToastService, private tokenService: TokenService, private loaderService: LoaderService, private userService: UserService) {
    this.form = fb.group({
      email: fb.control('', [Validators.required, Validators.email, Validators.pattern(".*@(univ-valenciennes.fr|etu.univ-valenciennes.fr)")]),
      password: fb.control('', [Validators.required])
    });
  }

  login(): void {
    this.loaderService.presentLoaderDefault('Connexion en cours');
    this.authService.login(this.form.value).subscribe(
      result => {
        this.tokenService.setToken(result.token);
        this.loaderService.dismissLoader();
        this.userService.setUser(_.cloneDeep(result.user));
        this.navCtrl.push(TabsPage);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
        this.loaderService.dismissLoader();
      }
    );
  }

}
