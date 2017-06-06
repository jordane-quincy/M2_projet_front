import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  profil: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profil = [{
      picture: "",
      firstname: "Clément",
      lastname: "DELPECH",
      birthdate: "14/02/1993",
      etudiant: true,
      title: "M1 TNSI"
    }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
