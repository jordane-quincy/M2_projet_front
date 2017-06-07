import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profil: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profil = [{
      picture: "",
      firstname: "Clément",
      lastname: "DELPECH",
      birthdate: "14/02/1993",
      etudiant: true,
      title: "M1 TNSI",
      mark: 4
    }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }
}
