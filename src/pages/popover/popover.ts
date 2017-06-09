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
/*
  deleteAccount(id: number): void {
    let prompt = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: 'Saississez votre mot de passe pour supprimer votre compte ?',
      inputs: [
        {
          name: 'password',
          placeholder: 'Mot de passe'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler:() => {
            console.log('annulation');
          }
        },
        {
          text:'Supprimer',
          handler: data => {
            this.userService.deleteAccount(data).subscribe(
              res => {
                this.toastService.presentToast((res || {}).message, "success");
              },
              err => {
                this.toastService.presentToast((err || {}).message, "alert");
              }
            );
            console.log('Suppression');
          }
        }
      ]
    });
    prompt.present();
  }*/
}
