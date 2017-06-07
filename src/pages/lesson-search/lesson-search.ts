import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-lesson-search',
  templateUrl: 'lesson-search.html',
})
export class LessonSearchPage {
  structure: any = { lower: 1, upper: 5 };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

}
