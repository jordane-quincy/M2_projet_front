import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { OfferService, ToastService, LoaderService, DomainsService } from '../../providers/index';
import { UserOffersPage } from '../user-offers/user-offers';

@Component({
  selector: 'page-add-offer',
  templateUrl: 'add-offer.html',
})
export class AddOfferPage {

  form: FormGroup;
  domaineList: any[];
  offer: any;
  updateMode: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private fb: FormBuilder, 
              private offerService: OfferService, 
              private toastService: ToastService, 
              private loaderService: LoaderService,
              private domainsService: DomainsService) {
    if(this.navParams.data.offer) {
      this.offer = this.navParams.data.offer;
      this.updateMode = true;
    } else {
      this.updateMode = false;
    }
    this.form = fb.group({
      title: fb.control(this.updateMode ? this.offer.title : '', [Validators.required]),
      description: fb.control(this.updateMode ? this.offer.description : '', [Validators.required]),
      duration: fb.control(this.updateMode ? this.offer.duration : '1'),
      domainId: fb.control(this.updateMode ? this.offer.domain.id : '', [Validators.required])
    });

  }

  ionViewDidLoad() {
    this.getDomainesFromBack();
  }

  getDomainesFromBack() {
    this.loaderService.presentLoaderDefault('Chargement en cours');
    this.domainsService.getDomainsList().subscribe(
      res => {
        this.domaineList = res;
        this.loaderService.dismissLoader();
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
        this.loaderService.dismissLoader();
      }
    );
  }

  add() {
    this.loaderService.presentLoaderDefault('Enregistrement en cours');
    this.offerService.createOffer(this.form.value).subscribe(
      result => {
        this.toastService.presentToast("Votre offre a été ajoutée", "success");
        this.loaderService.dismissLoader();
        this.navCtrl.pop(UserOffersPage);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
        this.loaderService.dismissLoader();
      }
    );
  }

  modify(){
    this.loaderService.presentLoaderDefault('Enregistrement en cours');
    this.offerService.updateOffer(this.form.value, this.offer.id).subscribe(
      result => {
        this.toastService.presentToast("Votre offre a bien été modifiée", "success");
        this.loaderService.dismissLoader();
        this.navCtrl.pop(UserOffersPage);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
        this.loaderService.dismissLoader();
      }
    );
  }

}
