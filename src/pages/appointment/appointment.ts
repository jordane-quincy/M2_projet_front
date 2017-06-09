import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OfferService, ToastService } from '../../providers/index';

@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {

  appointmentList: any[];
  courseList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private offerService: OfferService, private toastService: ToastService) {
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

  showConfirmDelete(id: number, listName: string): void {
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
              this.courseList = this.courseList.filter(element => element.id !== id);
            } else if(listName === 'appointmentList') {
              this.appointmentList = this.appointmentList.filter(element => element.id !== id);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirmValid(appointment){
    // this.navCtrl.push
  }
}
