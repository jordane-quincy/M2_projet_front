import { Component } from '@angular/core';
import { PopoverController, NavController, NavParams } from 'ionic-angular';
import { CreateAccountSkillsPage } from '../create-account-skills/create-account-skills';
import { PopoverPage } from '../popover/popover';
import { UserService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-profil',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private profile: any;

  ionViewWillEnter() {
    // get connected user
    this.profile = _.cloneDeep(this.userService.getUser());
    this.profile.comments = [{}, {}];
    this.profile.stars = [0,0,0,0,0];

    // Définition du profil
    this.profile.picture = "assets/logo.png";

    this.profile.comments[0].mark = "5/5";
    this.profile.comments[0].text = "Très bon cours. Avec beaucoup de contenu. prof ponctuel";

    this.profile.comments[1].mark = "1/5";
    this.profile.comments[1].text = "Cours de merde";
    this.starsDefinition(2.75);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private userService: UserService) {
    // get connected user
    this.profile = _.cloneDeep(this.userService.getUser());
    this.profile.comments = [{}, {}];
    this.profile.stars = [0,0,0,0,0];

    // Définition du profil
    this.profile.picture = "assets/logo.png";

    this.profile.comments[0].mark = "5/5";
    this.profile.comments[0].text = "Très bon cours. Avec beaucoup de contenu. prof ponctuel";

    this.profile.comments[1].mark = "1/5";
    this.profile.comments[1].text = "Cours de merde";
    this.starsDefinition(2.75);
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
