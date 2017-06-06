import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder) {
    // Define control
    this.lastNameCtrl = fb.control('', Validators.required);
    this.firstNameCtrl = fb.control('', Validators.required);
    this.phoneNumberCtrl = fb.control('');
    this.emailCtrl = fb.control('', Validators.required);
    this.passwordCtrl = fb.control('', Validators.required);
    this.repeatPasswordCtrl = fb.control('', Validators.required);

    // defin create account form
    this.createAccountForm = fb.group({
      lastName: this.lastNameCtrl,
      firstName: this.firstNameCtrl,
      phoneNumber: this.phoneNumberCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
      repeatPassword: this.repeatPasswordCtrl
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  createAccount() {
    console.log(this.createAccountForm.value);
  }
}
