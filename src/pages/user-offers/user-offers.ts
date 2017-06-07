import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddStudentPage } from '../add-student/add-student';

@Component({
  selector: 'page-user-offers',
  templateUrl: 'user-offers.html',
})
export class UserOffersPage {

  userOffersList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userOffersList = [];
  }

  ionViewDidLoad() {
  }

  addStudent(){
    this.navCtrl.push(AddStudentPage);
  }

}
