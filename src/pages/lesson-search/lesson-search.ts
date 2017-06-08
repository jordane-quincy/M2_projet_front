import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'page-lesson-search',
  templateUrl: 'lesson-search.html',
})
export class LessonSearchPage {
  searchFilters: FormGroup;

  keywordsCtrl: FormControl;


  structure: any = { lower: 1, upper: 5 };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  startSearch(){

  }
}
