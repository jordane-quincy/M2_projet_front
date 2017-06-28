import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomainsService, OfferService, ToastService, LoaderService, UserService } from '../../providers/index';
import { OfferDetailsPage } from '../offer-details/offer-details';

@Component({
  selector: 'page-lesson-search',
  templateUrl: 'lesson-search.html',
})
export class LessonSearchPage {

  searchFilters: FormGroup;
  private domainsList: any[];
  private domainsListChecked: any[];
  offersList: any[];
  isAvandcedSearch = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    public domainsService: DomainsService,
    public offerService: OfferService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private userService: UserService
  ) {
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

  }

  ionViewDidEnter(): void {
    this.retrieveData();
    this.searchFilters = this.fb.group({
      keywords: this.fb.control(""),
      domains: this.fb.control(this.domainsListChecked),
      duration: this.fb.control({ lower: 1, upper: 5 }),
      teacher: this.fb.control(true),
      student: this.fb.control(true),
      minavggrade: 0
    });
  }

  retrieveData(refresher?: any): void {
    this.initDomainsList();
    this.refreshCredit();
    this.startSearch(refresher);
  }

  refreshCredit() {
    this.userService.getUserCreditFromBack().subscribe(
      result => {
        this.userService.setUserCredit(result.credit);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

  initDomainsList(): void {
    this.domainsService.getDomainsList().subscribe(
      result => {
        this.domainsList = [...result];
        for (var i = 0; i < this.domainsList.length; i++) {
          this.domainsListChecked.push(this.domainsList[i].id);
        }
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

  startSearch(refresher?: any): void {
    if (this.searchFilters.value.teacher || this.searchFilters.value.student) {
      if(!refresher) {
        this.loaderService.presentLoaderDefault('Recherche en cours');
      }
      this.offerService.getOffersByFilters(this.searchFilters.value).subscribe(
        result => {
          this.offersList = result;
          refresher ? refresher.complete() : this.loaderService.dismissLoader();
        },
        error => {
          this.toastService.presentToast((error || {}).message, "alert");
          refresher ? refresher.complete() : this.loaderService.dismissLoader();
        }
      )
    }
  }

  showAdvanceSearch(): void {
    this.isAvandcedSearch = !this.isAvandcedSearch;
  }

  
  handleOfferClick(offer: any): void {
    this.navCtrl.push(OfferDetailsPage, {
      offer: offer
    });
  }
}
