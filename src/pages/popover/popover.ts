import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

import { CreateAccountPage } from '../create-account/create-account';

@Component({
  template: `
    <ion-list>
      <ion-list-header>Modifier</ion-list-header>
      <button ion-item (click)="goToUpdateProfile()">Profil</button>
      <button ion-item (click)="goToUpdateSkills()">Compétences</button>
    </ion-list>
  `
})
export class PopoverPage {
  private navControllerOfProfilePage: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.navControllerOfProfilePage = navParams.get('navCtrlData');
    console.log(this.navControllerOfProfilePage);
  }

  goToUpdateSkills() {
    this.viewCtrl.dismiss();
    // Ajouter la redirection vers la page de modification des compétences
  }

  goToUpdateProfile() {
    this.viewCtrl.dismiss();
    this.navControllerOfProfilePage.push(CreateAccountPage, {user:
      {
        "id": 123,
        "lastname":"Duriez",
        "firstname":"Jean-Baptiste",
        "birthdate":781401600000,
        "phoneNumber":"0668554964",
        "email":"duriez.jeanbaptiste@etu.univ-valenciennes.fr",
        "question":"Nom de la mère",
        "answer":"Lemaire",
        "formation":"M2 TNSI-FA",
        "password":"abcd",
        "skills":[
          {
          "skillLabel":"JS",
          "skillMark":3,
          "customSkill":false
          },
          {
          "skillLabel":"React",
          "skillMark":4,
          "customSkill":false
          },
          {
          "skillLabel":"Custom competence",
          "skillMark":5,
          "customSkill":true
          }
        ]
      }
    });
  }
}
