import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-lesson-search',
  templateUrl: 'lesson-search.html',
})
export class LessonSearchPage {
  searchFilters: FormGroup;

  // keywordsCtrl: FormControl;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder) {
    this.searchFilters = fb.group({
      keywords: fb.control(""),
      domaines: fb.control(""),
      duration: fb.control({ lower: 1, upper: 5 }),
    });
  }

  startSearch(){

  }
}
