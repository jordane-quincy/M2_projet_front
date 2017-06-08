import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AddStudentPage } from '../add-student/add-student';

import { OfferService, ToastService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-pending-request',
  templateUrl: 'pending-request.html',
})
export class PendingRequestPage {

  pendingRequests: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private offerservice: OfferService, private toastService: ToastService) {

  }

  ionViewDidLoad() {
    this.getAllAppointments();
  }

  getAllAppointments(){
    this.offerservice.getAllAppointments().subscribe(
      result => {
        this.pendingRequests = (_.cloneDeep(result) || []).map(offer => {
          return {
            id: offer.id,
            date: offer.date,
            offer: offer.offer,
            duration: offer.duration,
            status : offer.status,
            firstName: offer.FirstName,
            lastName: offer.lastName,
          };
        });
        console.log(result);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
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

  addStudent(){
    this.navCtrl.push(AddStudentPage);
  }

}
