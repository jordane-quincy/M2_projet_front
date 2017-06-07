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
      firstname: "",
      lastname: "",
      birthdate: "",
      role: "",
      roleTitle: "",
      competences: [
        {
          name: "",
          value: ""
        },
        {
          name: "",
          value: ""
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

    this.profile.competences[0].name = "HTML";
    this.profile.competences[0].value = "76";

    this.profile.competences[1].name = "JavaScript";
    this.profile.competences[1].value = "50";

    this.profile.comments[0].mark = "5/5";
    this.profile.comments[0].comment = "Très bon cours. Avec beaucoup de contenu. prof ponctuel";

    this.profile.comments[1].mark = "1/5";
    this.profile.comments[1].comment = "Cours de merde";

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

  addCompetences(){
    // this.navCtrl.push();
    console.log("Je clique sur ajouter des compétences");
  }
}
