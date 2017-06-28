import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController } from 'ionic-angular';

import { CreateAccountPage } from '../create-account/create-account';
import { CreateAccountSkillsPage } from '../create-account-skills/create-account-skills';

import { UserService, ToastService } from '../../providers/index';

@Component({
  templateUrl: 'popover.html'
})
export class PopoverPage {
  private navControllerOfProfilePage: NavController;
  connectedUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController, private userService: UserService, private toastService: ToastService) {
    this.navControllerOfProfilePage = navParams.get('navCtrlData');
    this.connectedUser = navParams.get('connectedUser');
  }

  goToUpdateSkills() {
    this.viewCtrl.dismiss();
    // Ajouter la redirection vers la page de modification des compétences
    this.navControllerOfProfilePage.push(
      CreateAccountSkillsPage,
      {
        connectedUser: this.connectedUser
      }
    );
  }

  goToUpdateProfile() {
    this.viewCtrl.dismiss();
    this.navControllerOfProfilePage.push(
      CreateAccountPage,
      {
        user: this.connectedUser
      }
    );
  }
}
