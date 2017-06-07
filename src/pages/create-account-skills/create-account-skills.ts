import { Component } from '@angular/core';
import { ToastController, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { LoginPage } from '../login/login';
import * as _ from 'lodash';

@Component({
  selector: 'page-create-account-skills',
  templateUrl: 'create-account-skills.html'
})
export class CreateAccountSkillsPage {

  user: any;

  selectedSkills: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, public toastCtrl: ToastController) {
    this.user = _.cloneDeep(navParams.get('user'));
    this.selectedSkills = [];
  }

  ionViewDidLoad() {
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  createAccount() {
    this.user.skills = _.cloneDeep(this.selectedSkills);
    this.userService.createAccount(this.user).subscribe(
      res => {
        console.log("success");
        this.presentToast("Votre compte a été créé, validez-le avec le lien dans l'email qui vous a été envoyé");
        // redirect to login page
        this.navCtrl.push(LoginPage);
      },
      err => {
        console.log("err");
      }
    );
  }

}
