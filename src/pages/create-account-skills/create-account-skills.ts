import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService, ToastService } from '../../providers/index';
import { LoginPage } from '../login/login';
import * as _ from 'lodash';

@Component({
  selector: 'page-create-account-skills',
  templateUrl: 'create-account-skills.html'
})
export class CreateAccountSkillsPage {

  user: any;

  selectedSkills: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, public toastService: ToastService) {
    this.user = _.cloneDeep(navParams.get('user'));
    this.selectedSkills = [];
  }

  ionViewDidLoad() {
  }

  createAccount() {
    this.user.skills = (_.cloneDeep(this.selectedSkills) || []).map(element => {
      return element.skillLabel;
    });
    this.userService.createAccount(this.user).subscribe(
      res => {
        console.log("success");
        this.toastService.presentToast("Votre compte a été créé, validez-le avec le lien dans l'email qui vous a été envoyé", "success");
      },
      err => {
        console.log(err);
        this.toastService.presentToast((err || {}).message, "alert");
      }
    );
  }

}
