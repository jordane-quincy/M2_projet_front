import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { OfferService, ToastService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-add-offer',
  templateUrl: 'add-offer.html',
})
export class AddOfferPage {

  form: FormGroup;
  domaineList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private imagePicker: ImagePicker, private offerService: OfferService, private toastService: ToastService) {
    this.form = fb.group({
      title: fb.control('', [Validators.required]),
      description: fb.control('', [Validators.required]),
      duration: fb.control('1'),
      domainId: fb.control('', [Validators.required])
    });
  }

  ionViewDidLoad() {
    // Get formation from back
    this.getDomainesFromBack();
  }

  getDomainesFromBack() {
    this.offerService.getDomaines().subscribe(
      res => {
        // initiate this.formationList with the response
        this.domaineList = (_.cloneDeep(res) || []).map(domaine => {
          return {
            id: domaine.id,
            label: domaine.domainName
          };
        });
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
      }
    );
  }

  getPic() {
    // this.imagePicker.getPictures(null).then(
    //   results => {
    //     for (var i = 0; i < results.length; i++) {
    //         console.log('Image URI: ' + results[i]);
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    this.imagePicker.hasReadPermission().then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.imagePicker.requestReadPermission().then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  add() {
      console.log(this.form.value);
      this.offerService.createOffer(this.form.value).subscribe(
      result => {
        console.log(result);
        // this.navCtrl.push(OffersListPage);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

}
