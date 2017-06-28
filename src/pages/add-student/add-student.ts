import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService, ToastService, LoaderService } from '../../providers/index';
import { PendingRequestPage } from '../pending-request/pending-request';

@Component({
  selector: 'page-add-student',
  templateUrl: 'add-student.html',
})
export class AddStudentPage {

  form: FormGroup;
  date: Date;
  student: any;
  maxDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private offerservice: OfferService, private toastService: ToastService, private loaderService: LoaderService) {
    if (this.navParams.data.student) {
      this.student = this.navParams.data.student;
    }
    this.form = fb.group({
      date: fb.control(this.date, [Validators.required])
    });
    this.maxDate = (new Date()).getFullYear() + 1;
  }

  ionViewDidLoad() {

  }

  addStudent() {
    let body = {
      "IdOffer": this.student.id,
      "date": new Date(this.form.value.date).valueOf(),
      "duration": this.student.duration,
      "status": "VALIDATED"
    };
    this.loaderService.presentLoaderDefault('Enregistrement en cours');
    this.offerservice.updateAppointment(body).subscribe(
      result => {
        this.toastService.presentToast("Votre rendez-vous a bien été enregistré", "success");
        this.loaderService.dismissLoader();
        this.navCtrl.pop(PendingRequestPage);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
        this.loaderService.dismissLoader();
      }
    );
  }

}
