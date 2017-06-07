import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-add-student',
  templateUrl: 'add-student.html',
})
export class AddStudentPage {

  form: FormGroup;
  date: Date;
  time: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder) {
    this.form = fb.group({
      date: fb.control(this.date, [Validators.required]),
      time: fb.control(this.time, [Validators.required]),
      student: fb.control('', [Validators.required])
    });
  }

  ionViewDidLoad(){

  }

  addStudent() {
    console.log(this.form.value);
  }

}
