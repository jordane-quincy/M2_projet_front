import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService, ToastService, LoaderService } from '../../providers/index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'page-create-account-skills',
  templateUrl: 'create-account-skills.html'
})
export class CreateAccountSkillsPage {

  user: any;
  selectedSkills: Object[];
  isUpdating: boolean;
  updateSkillsAccount: FormGroup;
  passwordCtrl: FormControl;
  connectedUser: any;

  constructor(public navCtrl: NavController, private fb: FormBuilder, public navParams: NavParams, private userService: UserService, public toastService: ToastService, private loaderService: LoaderService) {
    this.user = _.cloneDeep(navParams.get('user'));
    // get user info if we are updating
    this.connectedUser = _.cloneDeep(navParams.get('connectedUser'));
    this.isUpdating = !!this.connectedUser;
    this.selectedSkills = this.isUpdating ? _.cloneDeep(this.connectedUser.skills) : [];

    // form for password
    let validatorsForValidatePassword = [];
    if (this.isUpdating) {
      validatorsForValidatePassword = [Validators.required];
    }
    this.passwordCtrl = fb.control('', validatorsForValidatePassword);
    this.updateSkillsAccount = fb.group({
      password: this.passwordCtrl
    });
  }

  createAccount() {
    // check if we are updating user or creating one
    if (this.isUpdating) {
      let skills = (_.cloneDeep(this.selectedSkills) || []).map(skill => {
        return skill.label;
      });
      let body = _.cloneDeep(this.connectedUser);
      body.skills = skills;
      body.formationId = body.formation.id;
      delete (body.formation);
      body.validatePassword = this.updateSkillsAccount.value.password;
      this.loaderService.presentLoaderDefault('Modification en cours');
      this.userService.updateAccount(body).subscribe(
        res => {
          this.toastService.presentToast("Votre compte a été mis à jour", "success");
          this.loaderService.dismissLoader();
          this.userService.setUser(res);
          this.navCtrl.pop();
        },
        err => {
          this.toastService.presentToast((err || {}).message, "alert");
          this.loaderService.dismissLoader();
        }
      );
    }
    else {
      this.user.skills = (_.cloneDeep(this.selectedSkills) || []).map(element => {
        return element.label;
      });
      this.loaderService.presentLoaderDefault('Création en cours');
      this.userService.createAccount(this.user).subscribe(
        res => {
          this.toastService.presentToast("Votre compte a été créé, validez-le avec le lien dans l'email qui vous a été envoyé", "success");
          this.loaderService.dismissLoader();
          this.navCtrl.popToRoot();
        },
        err => {
          this.toastService.presentToast((err || {}).message, "alert");
          this.loaderService.dismissLoader();
        }
      );
    }
  }

}
