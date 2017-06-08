import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService, ToastService } from '../../providers/index';
import { PendingRequestPage } from '../pending-request/pending-request';
import * as _ from 'lodash';

@Component({
  selector: 'page-add-student',
  templateUrl: 'add-student.html',
})
export class AddStudentPage {

  form: FormGroup;
  date: Date;
  time: Date;
  student: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private offerservice: OfferService, private toastService: ToastService) {
    if(this.navParams.data.student) {
      this.student = this.navParams.data.student;
    }
    this.form = fb.group({
      date: fb.control(this.date, [Validators.required]),
      time: fb.control(this.time, [Validators.required])
    });
  }

  ionViewDidLoad() {

  }

  addStudent() {
    let body = {
      "id": this.student.id,
      "date": this.form.value,
      "offer": this.student.offer,
      "duration": this.student.duration,
      "status": "VALIDATED",
      "firstName": this.student.firstName,
      "lastName": this.student.lastName

    };
    this.offerservice.updateAppointments(body).subscribe(
      result => {
        this.toastService.presentToast("Votre rendez-vous a bien été enregistré", "success");
        this.navCtrl.pop(PendingRequestPage);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

}
