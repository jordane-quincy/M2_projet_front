import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private profile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Initialisation du profil
    this.profile = {
      picture: "",
      firstname: "Clément",
      lastname: "DELPECH",
      birthdate: "14/02/1993",
      etudiant: true,
      title: "M1 TNSI",
      mark: [
        0,
        0,
        0,
        0,
        0
      ]
    }

    // Définition des étoiles
    this.starsDefinition(3);
  }

  starsDefinition(mark: any): void {
    var i: any;
    i = 0;

    while(mark > 0)
    {
      if((mark - 1) >= 0)
      {
        mark = mark - 1;
        this.profile.mark[i] = 1;
      }
      else if(mark - 0.5 >= 0)
      {
        mark = mark - 0.5;
        this.profile.mark[i] = 0.5;
      }
      else if(mark >= 0.25 && mark < 0.5)
      {
        if(this.profile.mark[i-1] == 0.5)
        {
          mark = 0;
          this.profile.mark[i-1] = 1;
        }
        else
        {
          mark = 0;
          this.profile.mark[i] = 0.5;
        }
      }
      else
      {
        mark = 0;
      }

      i++;
    }
  }

  addCompetences(){
    // this.navCtrl.push();
    console.log("Je clique sur ajouter des compétences");
  }
}
