import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-add-comment',
  templateUrl: 'add-comment.html',
})
export class AddCommentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addComment() : void{
    // let confirm = this.alertCtrl.create({
    //   title: 'Confirmation de paiement',
    //   message: 'Votre compteur de temps sera débité de '+ appointment.hours +'h. Voulez-vous continuer ?',
    //   buttons: [
    //     {
    //       text: 'Annuler',
    //       role: 'cancel'
    //     },
    //
    //     {
    //       text:'Confirmer',
    //       handler: () => {
    //         let body = {
    //           "IdOffer": appointment.id,
    //           "date": appointment.date,
    //           "duration": appointment.offer.duration,
    //           "status": "FINISHED"
    //         };
    //
    //         this.offerService.updateAppointment(body).subscribe(
    //           result => {
    //             this.toastService.presentToast("Votre compte a été débité", "success");
    //             this.navCtrl.pop(AppointmentPage);
    //           },
    //           error => {
    //             this.toastService.presentToast((error || {}).message, "alert");
    //           }
    //         );
    //       }
    //     }
    //   ]
    // });
    // confirm.present();
  }
}
