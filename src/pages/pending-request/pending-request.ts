import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AddStudentPage } from '../add-student/add-student';

import { OfferService, ToastService } from '../../providers/index';

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
        this.pendingRequests = result;
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

  showConfirm(request: any): void {
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
            let body = {
              "IdOffer": request.id,
              "date": request.date,
              "duration": request.duration,
              "status": "REFUSED"
            };
            this.offerservice.updateAppointment(body).subscribe(
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

  addStudent(student: any){
    this.navCtrl.push(AddStudentPage, {
      student: student
    });
  }

}
