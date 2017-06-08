import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService, ToastService, LoaderService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-create-account-skills',
  templateUrl: 'create-account-skills.html'
})
export class CreateAccountSkillsPage {

  user: any;

  selectedSkills: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private toastService: ToastService, private loaderService: LoaderService) {
    this.user = _.cloneDeep(navParams.get('user'));
    this.selectedSkills = [];
  }

  ionViewDidLoad() {
  }

  createAccount() {
    this.user.skills = (_.cloneDeep(this.selectedSkills) || []).map(element => {
      return element.skillLabel;
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
