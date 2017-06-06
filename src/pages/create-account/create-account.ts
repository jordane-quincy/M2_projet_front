import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
/**
 * Generated class for the CreateAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})

export class CreateAccountPage {
  createAccountForm: FormGroup;
  lastNameCtrl: FormControl;
  firstNameCtrl: FormControl;
  phoneNumberCtrl: FormControl;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  repeatPasswordCtrl: FormControl;
  passwordForm: FormGroup;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const repeatPassword = group.get('repeatPassword').value;
    return password === repeatPassword ? null : { matchingError: true };
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder) {
    // Define control
    this.lastNameCtrl = fb.control('', Validators.required);
    this.firstNameCtrl = fb.control('', Validators.required);
    this.phoneNumberCtrl = fb.control('');
    this.emailCtrl =  fb.control('', [Validators.required, Validators.email, Validators.pattern(".*@(univ-valenciennes.fr|etu.univ-valenciennes.fr)")]);
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.repeatPasswordCtrl = fb.control('', [Validators.required]);
    this.passwordForm = fb.group(
      {password: this.passwordCtrl, repeatPassword: this.repeatPasswordCtrl},
      {validator: CreateAccountPage.passwordMatch}
    )
    // defin create account form
    this.createAccountForm = fb.group({
      lastName: this.lastNameCtrl,
      firstName:   this.firstNameCtrl,
      phoneNumber: this.phoneNumberCtrl,
      email: this.emailCtrl,
      passwordForm: this.passwordForm
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  createAccount() {
    console.log(this.createAccountForm.value);
  }
}
