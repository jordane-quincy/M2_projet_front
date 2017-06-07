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
  isUpdating: boolean;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const repeatPassword = group.get('repeatPassword').value;
    return password === repeatPassword ? null : { matchingError: true };
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder) {
    // Check if we are updating user or creating one
    // TODO maybe get the user witht he fact that he's connected
    let user = navParams.get('user');
    this.isUpdating = !!user;
    // Define control
    this.lastNameCtrl = fb.control(_.get(user, "lastName", ""), Validators.required);
    this.firstNameCtrl = fb.control(_.get(user, "firstName", ""), Validators.required);
    let userBirthDateTimestamp = _.get(user, "birthDate", false);
    let userBirthDateObject = !!userBirthDateTimestamp ? new Date(userBirthDateTimestamp) : false;
    this.birthDateCtrl = fb.control(
      !!userBirthDateObject ?
        userBirthDateObject.toISOString()
        :
        ""
    );
    this.phoneNumberCtrl = fb.control(_.get(user, "phoneNumber", ""));
    this.emailCtrl =  fb.control(_.get(user, "email", ""), [Validators.required, Validators.email, Validators.pattern(".*@(univ-valenciennes.fr|etu.univ-valenciennes.fr)")]);
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.repeatPasswordCtrl = fb.control('', [Validators.required]);
    this.passwordForm = fb.group(
      {password: this.passwordCtrl, repeatPassword: this.repeatPasswordCtrl},
      {validator: CreateAccountPage.passwordMatch}
    )
    this.questionCtrl = fb.control(_.get(user, "question", ""), [Validators.required]);
    this.answerCtrl = fb.control(_.get(user, "answer", ""), [Validators.required]);
    this.formationCtrl = fb.control(_.get(user, "formation", ""), [Validators.required]);

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
