import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { CreateAccountSkillsPage } from '../create-account-skills/create-account-skills'
import { UserService, ToastService } from '../../providers/index';
import { ProfilePage } from '../profile/profile';

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
  validatePasswordCtrl: FormControl;
  passwordForm: FormGroup;
  questionCtrl: FormControl;
  answerCtrl: FormControl;
  formationCtrl: FormControl;
  formationList: any[];
  isUpdating: boolean;
  connectedUser: any;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const repeatPassword = group.get('repeatPassword').value;
    return password === repeatPassword ? null : { matchingError: true };
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private userService: UserService, public toastService: ToastService) {
    // Check if we are updating user or creating one
    // TODO maybe get the user witht he fact that he's connected
    let user = navParams.get('user');
    this.connectedUser = _.cloneDeep(user);
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
    let validatorsForValidatePassword = [];
    if (this.isUpdating) {
      validatorsForValidatePassword = [Validators.required];
    }
    this.validatePasswordCtrl = fb.control('', validatorsForValidatePassword)

    this.formationList = ["L3-Info", "M2 TNSI-FA", "M2-TNSI-FI","L3-Info", "M2 TNSI-FA", "M2-TNSI-FI","L3-Info", "M2 TNSI-FA", "M2-TNSI-FI"];


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
      formation: this.formationCtrl,
      validatePassword: this.validatePasswordCtrl
    });
  }

  ionViewDidLoad() {
  }

  createAccount() {
    let user = _.cloneDeep(this.createAccountForm.value);
    user.password = user.passwordForm.password;
    user.birthDate = +new Date(user.birthDate);
    let validatePassword = user.validatePassword;
    delete(user.validatePassword);
    delete(user.passwordForm);
    if (this.isUpdating) {
      // update the account
      user.id = this.connectedUser.id;
      this.userService.updateAccount(user).subscribe(
        res => {
          console.log("success");
          this.toastService.presentToast("Votre compte a été mis à jour", "success");
          // redirect to profile page
          this.navCtrl.push(ProfilePage);
        },
        err => {
          console.log(err);
          this.toastService.presentToast((err || {}).message, "alert");
        }
      );
    }
    else {
      // create the account
      this.navCtrl.push(CreateAccountSkillsPage, {user: user});
    }
  }
}
