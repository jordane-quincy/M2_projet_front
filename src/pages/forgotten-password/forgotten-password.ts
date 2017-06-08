import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService, ToastService } from '../../providers/index';
import { ResetPasswordPage } from '../reset-password/reset-password';


@Component({
  selector: 'page-forgotten-password',
  templateUrl: 'forgotten-password.html',
})
export class ForgottenPasswordPage {
  forgottenPasswordForm: FormGroup;
  emailCtrl: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private userService: UserService, public toastService: ToastService) {
    this.emailCtrl =  fb.control('', [Validators.required, Validators.email, Validators.pattern(".*@(univ-valenciennes.fr|etu.univ-valenciennes.fr)")]);
    this.forgottenPasswordForm = fb.group({
      email: this.emailCtrl
    });
  }

  ionViewDidLoad() {

  }
  askForResetPassword() {
    // Send to the back the email to see if it exists, if yes, then redirect to the reset password page with secret questionCtrl
    this.userService.askForResetPassword(this.forgottenPasswordForm.value).subscribe(
      res => {
        //redirect to the resetPassword view with the question
        this.navCtrl.push(ResetPasswordPage, {questionLabel: res.question, email: this.forgottenPasswordForm.value.email});
      },
      err => {
        // Error, the email doesn't correspond to a user or server error
        // present toast
        this.toastService.presentToast((err || {}).message, 'alert');
      }
    );
  }

}
