import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AddStudentPage } from '../add-student/add-student';

@Component({
  selector: 'page-user-offers',
  templateUrl: 'user-offers.html',
})
export class UserOffersPage {

  userOffersList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.userOffersList = [];

  }

  ionViewDidLoad() {
  }

  showConfirm(){
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: 'Etes vous sur de vouloir supprimer cette offre ?',
      buttons: [
        {
          text: 'Annuler',
          handler:() => {
            console.log('annulation');
          }
        },
        {
          text:'Supprimer',
          handler: () => {
            console.log('Suppression');
          }
        }
      ]
    });
    confirm.present();
  }

  addStudent(){
    this.navCtrl.push(AddStudentPage);
  }

}
