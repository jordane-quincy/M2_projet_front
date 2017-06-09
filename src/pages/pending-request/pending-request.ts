import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { OfferService, ToastService } from '../../providers/index';

@Component({
  selector: 'page-pending-request',
  templateUrl: 'pending-request.html',
})
export class PendingRequestPage {

  pendingRequests: any[];
  myPendingRequests: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private offerservice: OfferService, private toastService: ToastService) {

  }

  ionViewDidLoad() {
    this.getAllAppointments();
    this.getAllRequests();
  }

  getAllAppointments(){
    this.offerservice.getAllAppointments().subscribe(
      result => {
        this.pendingRequests = result;
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }


  getAllRequests(){
    this.offerservice.getAllRequests().subscribe(
      result => {
        console.log(result);
        this.myPendingRequests = result;
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

  approve(request: any): void {
    request.status = 'VALIDATED';
    request.IdOffer = request.id;
    delete(request.id);
    console.log(request);
    this.offerservice.updateAppointment(request).subscribe(
      result => {
        this.myPendingRequests = this.myPendingRequests.filter(element => element.id !== request.IdOffer);
        this.toastService.presentToast("Demande de cours approuvé !", "success");
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

  showConfirm(request: any): void {
    request.status = 'CANCELLED';
    request.IdOffer = request.id;
    delete(request.id);
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: 'Etes vous sûr de vouloir supprimer cette demande en attente ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text:'Supprimer',
          handler: () => {
            this.offerservice.updateAppointment(request).subscribe(
              result => {
                 this.toastService.presentToast("Cette demande de rendez-vous a bien été supprimée", "success");
                this.pendingRequests = this.pendingRequests.filter(element => element.id !== request.id);
              },
              error => {
                this.toastService.presentToast((error || {}).message, "alert");
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirmUnsub(index: number): void {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: 'Etes vous sûr de vouloir supprimer cette demande en attente ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text:'Supprimer',
          handler: () => {
            this.offerservice.unsubscribeOffer({'IdOffer' : index}).subscribe(
              result => {
                this.myPendingRequests = this.myPendingRequests.filter(element => element.id !== index);
              },
              error => {
                this.toastService.presentToast((error || {}).message, "alert");
              }
            );

          }
        }
      ]
    });
    confirm.present();
  }

}
