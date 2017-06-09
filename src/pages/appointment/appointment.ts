import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OfferService, ToastService, UserService } from '../../providers/index';
import { AddCommentPage } from '../add-comment/add-comment';

@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {

  appointmentList: any[];
  courseList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private offerService: OfferService, private toastService: ToastService, private userService: UserService) {
  }

    ionViewDidLoad() {
    this.getAppointmentFromBack();
    this.getCoursesFromBack();
  }

  getAppointmentFromBack() {
    this.offerService.getAppointment().subscribe(
      res => {
        this.appointmentList = res;
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
      }
    );
  }

   retrieveData(refresher): void {
     this.offerService.getAppointment().subscribe(
      res => {
        this.appointmentList = res;
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
        refresher.complete();
      }
    );

     this.offerService.getCoursesToGive().subscribe(
      res => {
        this.courseList = res;
        refresher.complete();
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
        refresher.complete();
      }
    );

  }

  getCoursesFromBack() {
    this.offerService.getCoursesToGive().subscribe(
      res => {
        this.courseList = res;
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
      }
    );
  }

  showConfirmDelete(appointment: any, listName: string): void {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: 'Êtes-vous sûr de vouloir supprimer ce rendez-vous ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text:'Supprimer',
          handler: () => {
            if(listName === 'courseList') {
              let body = {'IdOffer' : appointment.id, 'status' : 'CANCELLED', 'date': appointment.date ,'duration': appointment.duration};
              this.offerService.updateAppointment(body).subscribe(
                result => {
                  this.userService.setUserCredit(result.user);
                  this.toastService.presentToast("Cours à donner supprimé !", "success");
                  this.courseList = this.courseList.filter(element => element.id !== appointment.id);
                },
                error => {
                  this.toastService.presentToast((error || {}).message, "alert");
                }
              );

            } else if(listName === 'appointmentList') {
              let body = {'IdOffer' : appointment.id, 'status' : 'CANCELLED', 'date': appointment.date ,'duration': appointment.offer.duration};
              this.offerService.updateAppointment(body).subscribe(
                result => {
                  this.toastService.presentToast("Cours à suivre supprimé !", "success");
                  this.appointmentList = this.appointmentList.filter(element => element.id !== appointment.id);
                },
                error => {
                  this.toastService.presentToast((error || {}).message, "alert");
                }
              );
            }
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirmValid(appointment){
    this.navCtrl.push(AddCommentPage, {appointment: appointment})
  }
}
