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
  questionCtrl: FormControl;
  answerCtrl: FormControl;
  formationCtrl: FormControl;
  formationList: any[];

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
    this.questionCtrl = fb.control('', [Validators.required]);
    this.answerCtrl = fb.control('', [Validators.required]);
    this.formationCtrl = fb.control('', [Validators.required]);

    this.formationList = ["L3-Info", "M2 TNSI-FA", "M2-TNSI-FI"];


    // defin create account form
    this.createAccountForm = fb.group({
      lastName: this.lastNameCtrl,
      firstName: this.firstNameCtrl,
      birthDate: this.birthDateCtrl,
      phoneNumber: this.phoneNumberCtrl,
      email: this.emailCtrl,
      passwordForm: this.passwordForm,
      question: this.questionCtrl,
      answer: this.answerCtrl,
      formation: this.formationCtrl
    });
  }

  ionViewDidLoad() {
  }

  createAccount() {
    // Formatting body
    let user = _.cloneDeep(this.createAccountForm.value);
    user.password = user.passwordForm.password;
    user.birthDate = +new Date(user.birthDate);
    delete(user.passwordForm);
    this.navCtrl.push(CreateAccountSkillsPage, {user: user});
  }
}
