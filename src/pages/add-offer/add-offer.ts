import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the AddOfferPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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

    console.log('ionViewDidLoad AddOfferPage');
  }

  getPic() {
      this.imagePicker.getPictures({
          // if no title is passed, the plugin should use a sane default (preferrably the same as it was, so check the old one.. there are screenshots in the marketplace doc)
          maximumImagesCount: 1,
          width: 400,
          quality: 80
        }).then((result) => {
          var content = '';
          for (var i = 0; i < result.length; i++) {
            content += '<img src="' + result[i] + '" style="max-width:200px"/>';
            //content += '<img src="data:image/jpg;base64,'+result[i]+'" style="max-width:200px"/>';
          }
          //document.getElementById("imageOutput").innerHTML = content;
        }, (err) => { alert('Error: ' + err); });

  }

  add() {
      console.log(this.form.value);
  }

}
