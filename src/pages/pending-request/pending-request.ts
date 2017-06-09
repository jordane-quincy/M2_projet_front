import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { OfferService, ToastService, UserService, LoaderService } from '../../providers/index';
import { AddStudentPage } from '../add-student/add-student';

@Component({
  selector: 'page-pending-request',
  templateUrl: 'pending-request.html',
})
export class PendingRequestPage {

  pendingRequests: any[];
  myPendingRequests: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private offerservice: OfferService, private toastService: ToastService, private userservice: UserService, private loaderService: LoaderService) {

  }

  ionViewDidEnter() {
    this.getAllAppointments();
    this.getAllRequests();
  }

  ionViewDidLoad() {
  }

  getAllAppointments(){
    let body = {
      "status": "PENDING"
    }
    this.loaderService.presentLoaderDefault('Chargement en cours');
    this.offerservice.getAllAppointments(body).subscribe(
      result => {
        this.pendingRequests = result;
        this.loaderService.dismissLoader();
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
        this.loaderService.dismissLoader();
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
            this.loaderService.presentLoaderDefault('Suppression en cours');
            this.offerservice.updateAppointment(request).subscribe(
              result => {
                this.toastService.presentToast("Cette demande de rendez-vous a bien été supprimée", "success");
                this.pendingRequests = this.pendingRequests.filter(element => element.id !== request.id);
                this.loaderService.dismissLoader();
              },
              error => {
                this.toastService.presentToast((error || {}).message, "alert");
                this.loaderService.dismissLoader();
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
            this.loaderService.presentLoaderDefault('Suppression en cours');
            this.offerservice.unsubscribeOffer({'IdOffer' : index}).subscribe(
              result => {
                this.userservice.setUserCredit(result.user);
                this.myPendingRequests = this.myPendingRequests.filter(element => element.id !== index);
                this.toastService.presentToast("Demande supprimée !", "success");
                this.loaderService.dismissLoader();
              },
              error => {
                this.toastService.presentToast((error || {}).message, "alert");
                this.loaderService.dismissLoader();
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
