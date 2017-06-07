import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { CreateAccountSkillsPage } from '../create-account-skills/create-account-skills'

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})

export class CreateAccountPage {
  createAccountForm: FormGroup;
  lastNameCtrl: FormControl;
  firstNameCtrl: FormControl;
  birthDateCtrl: FormControl;
  phoneNumberCtrl: FormControl;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  repeatPasswordCtrl: FormControl;
  passwordForm: FormGroup;
  question1Ctrl: FormControl;
  answer1Ctrl: FormControl;
  question2Ctrl: FormControl;
  answer2Ctrl: FormControl;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const repeatPassword = group.get('repeatPassword').value;
    return password === repeatPassword ? null : { matchingError: true };
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder) {
    // Define control
    this.lastNameCtrl = fb.control('', Validators.required);
    this.firstNameCtrl = fb.control('', Validators.required);
    this.birthDateCtrl = fb.control('');
    this.phoneNumberCtrl = fb.control('');
    this.emailCtrl =  fb.control('', [Validators.required, Validators.email, Validators.pattern(".*@(univ-valenciennes.fr|etu.univ-valenciennes.fr)")]);
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.repeatPasswordCtrl = fb.control('', [Validators.required]);
    this.passwordForm = fb.group(
      {password: this.passwordCtrl, repeatPassword: this.repeatPasswordCtrl},
      {validator: CreateAccountPage.passwordMatch}
    )
    this.question1Ctrl = fb.control('', [Validators.required]);
    this.answer1Ctrl = fb.control('', [Validators.required]);
    this.question2Ctrl = fb.control('', [Validators.required]);
    this.answer2Ctrl = fb.control('', [Validators.required]);

    // defin create account form
    this.createAccountForm = fb.group({
      lastName: this.lastNameCtrl,
      firstName: this.firstNameCtrl,
      birthDate: this.birthDateCtrl,
      phoneNumber: this.phoneNumberCtrl,
      email: this.emailCtrl,
      passwordForm: this.passwordForm,
      question1: this.question1Ctrl,
      answer1: this.answer1Ctrl,
      question2: this.question2Ctrl,
      answer2: this.answer2Ctrl
    });
  }

  ionViewDidLoad() {
  }

  createAccount() {
    // Formatting body
    let user = _.cloneDeep(this.createAccountForm.value);
    user.password = user.passwordForm.password;
    user.resetPasswordQuestions = [
      {
        question: user.question1,
        answer: user.answer1
      },
      {
        question: user.question2,
        answer: user.answer2
      }
    ];
    user.birthDate = +new Date(user.birthDate);
    delete(user.passwordForm);
    delete(user.question1);
    delete(user.answer1);
    delete(user.question2);
    delete(user.answer2);
    this.navCtrl.push(CreateAccountSkillsPage, {user: user});
  }
}
