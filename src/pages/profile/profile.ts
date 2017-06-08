import { Component } from '@angular/core';
import { PopoverController, NavController, NavParams } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { UserService, ToastService, LoaderService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-profil',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private profile: any;
  private id: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public popoverCtrl: PopoverController, 
              private userService: UserService,
              private toastService: ToastService,
              private loaderService: LoaderService) {
    this.profile = {};
  }

  ionViewDidLoad() {
    if(this.navParams.data.userId) {
      this.id = this.navParams.data.userId
      this.loaderService.presentLoaderDefault('Chargement du profil');
      this.profile = this.userService.getUserById(this.id).subscribe(
        result => {
          this.initProfile(result);
          this.loaderService.dismissLoader()
        },
        error => {
          this.toastService.presentToast((error || {}).message, "alert");
          this.loaderService.dismissLoader()
        }
      )
    } else {
      // get connected user
      this.initProfile(this.userService.getUser())
    }
  }

  initProfile(profile: any): void {
    this.profile = _.cloneDeep(profile);

    // Définition du profil
    this.profile.picture = "assets/logo.png";
    this.profile.comments = [];
    this.profile.comments.push({mark: '5/5', text: 'Très bon cours. Avec beaucoup de contenu. prof ponctuel'});
    this.profile.comments.push({mark: '1/5', text: 'Cours de merde'});

    this.profile.stars = [0,0,0,0,0];
    this.starsDefinition(2.75);
    console.log(this.profile);
  }

  starsDefinition(mark: any): void {
    var i: any;
    i = 0;

    while(mark > 0)
    {
      if((mark - 1) >= 0)
      {
        mark = mark - 1;
        this.profile.stars[i] = 1;
      }
      else if(mark - 0.5 >= 0)
      {
        mark = mark - 0.5;
        this.profile.stars[i] = 0.5;
      }
      else if(mark >= 0.25 && mark < 0.5)
      {
        if(this.profile.stars[i-1] == 0.5)
        {
          mark = 0;
          this.profile.stars[i-1] = 1;
        }
        else
        {
          mark = 0;
          this.profile.stars[i] = 0.5;
        }
      }
      else
        mark = 0;

      i++;
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {navCtrlData: this.navCtrl, connectedUser: _.cloneDeep(this.profile)});
    popover.present({ ev: myEvent });
  }
}
