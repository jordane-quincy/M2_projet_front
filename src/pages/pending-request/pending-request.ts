import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { OfferService, ToastService } from '../../providers/index';
import { AddStudentPage } from '../add-student/add-student';

@Component({
  selector: 'page-pending-request',
  templateUrl: 'pending-request.html',
})
export class PendingRequestPage {

  pendingRequests: any[];
  myPendingRequests: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private offerservice: OfferService, private toastService: ToastService, private AddStudentPage: AddStudentPage) {

  }

  ionViewDidLoad() {
    this.getAllAppointments();
    this.getAllRequests();
  }

  getAllAppointments(){
    let body = {
      "status": "PENDING"
    }
    this.offerservice.getAllAppointments(body).subscribe(
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
        this.myPendingRequests = result;
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }


  showConfirm(request: any): void {
    request.status = 'REFUSED';
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
                this.toastService.presentToast("Demande supprimée !", "success");
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
