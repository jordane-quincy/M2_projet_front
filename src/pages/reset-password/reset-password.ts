import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../providers/user-service';
import { LoginPage } from '../login/login';
import * as _ from 'lodash';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  questionLabel: string;
  resetPasswordForm: FormGroup;
  answerCtrl: FormControl;
  newPasswordCtrl: FormControl;
  newPasswordRepeatCtrl: FormControl;
  passwordForm: FormGroup;

  static passwordMatch(group: FormGroup) {
    const password = group.get('newPassword').value;
    const repeatPassword = group.get('newPasswordRepeat').value;
    return password === repeatPassword ? null : { matchingError: true };
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private userService: UserService, public toastCtrl: ToastController) {
    // Get question label for navParams
    this.questionLabel = navParams.get('questionLabel');
    // Setup Form
    this.answerCtrl =  fb.control('', [Validators.required]);
    this.newPasswordCtrl = fb.control('', [Validators.required]);
    this.newPasswordRepeatCtrl = fb.control('', [Validators.required]);
    this.passwordForm = fb.group(
      {newPassword: this.newPasswordCtrl, newPasswordRepeat: this.newPasswordRepeatCtrl},
      {validator: ResetPasswordPage.passwordMatch}
    )
    this.resetPasswordForm = fb.group({
      answer: this.answerCtrl,
      passwordForm: this.passwordForm
    });
  }

  ionViewDidLoad() {
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  resetPassword() {
    // remove useless repeatPassword
    let body = _.cloneDeep(this.resetPasswordForm.value);
    body.newPassword = body.passwordForm.newPassword;
    delete(body.passwordForm);
    // send the new password to the back
    this.userService.resetPassword(body).subscribe(
      res => {
        // Success, get the question in the response
        console.log("success");
        this.presentToast("Mot de passe réinitialisé");
        //redirect to the loginPage
        this.navCtrl.push(LoginPage);
      },
      err => {
        // Error, bad answer or error server
        console.log("err");
      }
    );
  }

}
