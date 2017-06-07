import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-add-offer',
  templateUrl: 'add-offer.html',
})
export class AddOfferPage {

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private imagePicker: ImagePicker) {
    this.form = fb.group({
      title: fb.control('', [Validators.required]),
      description: fb.control('', [Validators.required]),
      duration: fb.control('1')
    });
  }

  ionViewDidLoad() {

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
  }

}
