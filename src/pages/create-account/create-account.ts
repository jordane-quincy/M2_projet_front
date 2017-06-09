import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { CreateAccountSkillsPage } from '../create-account-skills/create-account-skills'
import { UserService, ToastService, FormationService } from '../../providers/index';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})

export class CreateAccountPage {
  createAccountForm: FormGroup;
  userNameCtrl: FormControl;
  userFirstNameCtrl: FormControl;
  birthdayCtrl: FormControl;
  phoneNumberCtrl: FormControl;
  userMailCtrl: FormControl;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private userService: UserService, public toastService: ToastService, public formationService: FormationService) {
    // Check if we are updating user or creating one
    // TODO maybe get the user witht he fact that he's connected
    let user = navParams.get('user');
    this.connectedUser = _.cloneDeep(user);
    this.isUpdating = !!user;
    // Define control
    this.userNameCtrl = fb.control(_.get(user, "userName", ""), Validators.required);
    this.userFirstNameCtrl = fb.control(_.get(user, "userFirstName", ""), Validators.required);
    let userbirthdayTimestamp = _.get(user, "birthday", false);
    let userbirthdayObject = !!userbirthdayTimestamp ? new Date(userbirthdayTimestamp) : false;
    this.birthdayCtrl = fb.control(
      !!userbirthdayObject ?
        userbirthdayObject.toISOString()
        :
        ""
    );
    this.phoneNumberCtrl = fb.control(_.get(user, "phoneNumber", ""));
    this.userMailCtrl = fb.control({value: _.get(user, "userMail", ""), disabled: this.isUpdating}, [Validators.required, Validators.email, Validators.pattern(".*(@univ-valenciennes.fr|@etu.univ-valenciennes.fr)")]);
    let validatorsForPassword = [];
    if (!this.isUpdating) {
      validatorsForPassword = [Validators.required];
    }
    this.passwordCtrl = fb.control('', validatorsForPassword);
    this.repeatPasswordCtrl = fb.control('', validatorsForPassword);
    this.passwordForm = fb.group(
      {password: this.passwordCtrl, repeatPassword: this.repeatPasswordCtrl},
      {validator: CreateAccountPage.passwordMatch}
    )
    this.questionCtrl = fb.control("", this.isUpdating ? [] : [Validators.required]);
    this.answerCtrl = fb.control("", this.isUpdating ? [] : [Validators.required]);
    this.formationCtrl = fb.control(_.get(user, "formation.id", ""), [Validators.required]);
    let validatorsForValidatePassword = [];
    if (this.isUpdating) {
      validatorsForValidatePassword = [Validators.required];
    }
    this.validatePasswordCtrl = fb.control('', validatorsForValidatePassword)

    // this.formationList = [{id: 1, label: "L3-Info"}, {id: 2, label: "M2-TNSI-FA"}, {id: 3, label: "M2-TNSI-FI"}];


    // defin create account form
    this.createAccountForm = fb.group({
      userName: this.userNameCtrl,
      userFirstName: this.userFirstNameCtrl,
      birthday: this.birthdayCtrl,
      phoneNumber: this.phoneNumberCtrl,
      userMail: this.userMailCtrl,
      passwordForm: this.passwordForm,
      question: this.questionCtrl,
      answer: this.answerCtrl,
      formation: this.formationCtrl,
      validatePassword: this.validatePasswordCtrl
    });
  }



  ionViewDidLoad() {
    // Get formation from back
    this.getFormationsFromBack();
  }

  getFormationsFromBack() {
    this.formationService.getFormations().subscribe(
      res => {
        // initiate this.formationList with the response
        this.formationList = (_.cloneDeep(res) || []);
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
      }
    );
  }

  createAccount() {
    let user = _.cloneDeep(this.createAccountForm.value);
    user.password = user.passwordForm.password;
    user.birthday = +new Date(user.birthday);
    let validatePassword = user.validatePassword;
    user.formationId = user.formation;
    delete(user.validatePassword);
    delete(user.formation);
    delete(user.passwordForm);
    if (this.isUpdating) {
      // update the account
      user.id = this.connectedUser.id;
      if (!user.password) {
        delete(user.password);
      }
      user.skills = (this.connectedUser.skills || []).map(skill => {
        return skill.label;
      });
      user.validatePassword = validatePassword;
      this.userService.updateAccount(user).subscribe(
        res => {
          this.toastService.presentToast("Votre compte a été mis à jour", "success");
          this.userService.setUser(res);
          // redirect to profile page
          this.navCtrl.pop();
        },
        err => {
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
