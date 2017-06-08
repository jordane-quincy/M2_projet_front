import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomainsService, OfferService } from '../../providers/index';

@Component({
  selector: 'page-lesson-search',
  templateUrl: 'lesson-search.html',
})
export class LessonSearchPage {
  searchFilters: FormGroup;
  private domainsList: any[];
  private domainsListChecked: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, public domainsService: DomainsService, public offerService: OfferService) {
    this.domainsList = [];
    this.domainsListChecked = [];

    this.searchFilters = fb.group({
      keywords: fb.control(""),
      domains: fb.control(this.domainsList),
      duration: fb.control({ lower: 1, upper: 5 }),
      teacher: fb.control(true),
      student: fb.control(true),
      minavggrade: 0
    });

    this.domainsService.getDomainsList().subscribe(
      result => {
        this.domainsList = [...this.domainsList, ...result];

        for(var i = 0; i < this.domainsList.length; i++)
          this.domainsListChecked.push(this.domainsList[i].id);

        this.searchFilters = fb.group({
          keywords: fb.control(""),
          domains: fb.control(this.domainsListChecked),
          duration: fb.control({ lower: 1, upper: 5 }),
          teacher: fb.control(true),
          student: fb.control(true),
          minavggrade: 0
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  startSearch(): void {
    console.log(this.searchFilters.value);

    this.offerService.getOffersByFilters(this.searchFilters.value).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }
}
