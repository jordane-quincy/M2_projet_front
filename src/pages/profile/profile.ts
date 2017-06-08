import { Component } from '@angular/core';
import { PopoverController, NavController, NavParams } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private profile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController ) {
    // Initialisation du profil
    this.profile = {
      picture: "",
      firstname: "",
      lastname: "",
      birthdate: "",
      role: "",
      roleTitle: "",
      skills: [
        {
          name: "",
          validate: ""
        },
        {
          name: "",
          validate: ""
        }
      ],
      comments: [
        {
          mark: "",
          comment: ""
        },
        {
          mark: "",
          comment: ""
        }
      ],
      stars: [ 0, 0, 0, 0, 0 ]
    }

    // Définition du profil
    this.profile.picture = "assets/logo.png";
    this.profile.firstname = "Clément";
    this.profile.lastname = "DELPECH";
    this.profile.birthdate = "14/02/1993";
    this.profile.role = "Etudiant";
    this.profile.roleTitle = "M1 TNSI";

    this.profile.skills[0].name = "HTML";
    this.profile.skills[0].validate = "false";

    this.profile.skills[1].name = "JavaScript";
    this.profile.skills[1].validate = "true";

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
    let popover = this.popoverCtrl.create(PopoverPage, {navCtrlData: this.navCtrl});
    popover.present({ ev: myEvent });
  }
}
