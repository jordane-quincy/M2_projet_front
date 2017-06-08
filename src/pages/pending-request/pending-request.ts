import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-pending-request',
  templateUrl: 'pending-request.html',
})
export class PendingRequestPage {

  pendingRequests: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.pendingRequests = [{
      title: 'Penelope Fillon - Finance',
      id : 1
    }, {
      title: 'Bill Gates - HTML/CSS/JS',
      id : 2
    }, {
      title: 'Google Chrome - AngularJS',
      id : 3
    }];
  }

  ionViewDidLoad() {

  }

  showConfirm(index: number): void {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: 'Etes vous sûr de vouloir supprimer cette demande en attente ?',
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
            this.pendingRequests = this.pendingRequests.filter(element => element.id !== index);
            console.log('Suppression');
          }
        }
      ]
    });
    confirm.present();
  }
}
