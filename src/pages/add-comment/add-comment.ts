import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OfferService, ToastService } from '../../providers/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentPage } from '../appointment/appointment';

@Component({
  selector: 'page-add-comment',
  templateUrl: 'add-comment.html',
})
export class AddCommentPage {
  private appointment: any;
  commentForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public alertCtrl: AlertController, private offerService: OfferService, private toastService: ToastService) {
    this.commentForm = fb.group({
      comment: fb.control("", [Validators.required]),
      grade: fb.control(0, [Validators.required])
    });

    this.appointment = navParams.get("appointment");
  }

  addComment() : void{
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de paiement',
      message: 'Attention si vous validez ce cours, vous ne pourrez plus récupérer les'+ this.appointment.offer.duration +'h même si celui-ci n a pas eu lieu. Voulez-vous continuer ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },

        {
          text:'Confirmer',
          handler: () => {
            let body = {
              "IdOffer": this.appointment.id,
              "date": this.appointment.date,
              "duration": this.appointment.offer.duration,
              "status": "FINISHED"
            };

            this.offerService.addUserComment(this.commentForm.value, this.appointment.offer.id).subscribe(
              result => {
                this.offerService.updateAppointment(body).subscribe(
                  result => {
                    this.toastService.presentToast("Votre compte a été débité", "success");
                    this.navCtrl.pop(AppointmentPage);
                  },
                  error => {
                    this.toastService.presentToast((error || {}).message, "alert");
                  }
                );
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
