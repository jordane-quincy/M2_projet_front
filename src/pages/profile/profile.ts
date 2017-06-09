import { Component } from '@angular/core';
import { PopoverController, NavController, NavParams, AlertController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { UserService, ToastService, LoaderService, SkillService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-profil',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private profile: any;
  private id: any;
  private currentUser: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private userService: UserService,
              private toastService: ToastService,
              private loaderService: LoaderService,
              private skillService: SkillService,
              private alertCtrl: AlertController) {
    this.profile = {};
  }

  ionViewDidLoad() {
    // get connected user
    this.currentUser = this.userService.getUser();
    if(this.navParams.data.userId) {
      this.id = this.navParams.data.userId
      this.loaderService.presentLoaderDefault('Chargement du profil');
      this.profile = this.userService.getUserById(this.id).subscribe(
        result => {
          this.initProfile(result);
          this.loaderService.dismissLoader();
        },
        error => {
          this.toastService.presentToast((error || {}).message, "alert");
          this.loaderService.dismissLoader();
        }
      )
    } else {
      this.initProfile(this.currentUser);
    }
  }

  initProfile(profile: any): void {
    this.profile = _.cloneDeep(profile);

    // get mark and comments
    this.userService.getCommentsAndMark({email: this.profile.userMail}).subscribe(
      result => {
        this.profile.stars = [0,0,0,0,0];
        this.starsDefinition(result.averageMark);
        this.profile.remarks = result.remarks;
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
        this.loaderService.dismissLoader();
      }
    )

    // Définition du profil
    this.profile.picture = "assets/logo.png";


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

  confirmSkillValidation(skill: any): void {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de validation',
      message:  `Êtes-vous sûr de vouloir valider la compétence ${skill.label} pour ${this.profile.userFirstName} ${this.profile.userName} ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text:'Valider',
          handler: () => {
            this.validateSkill(skill.id);
          }
        }
      ]
    });
    confirm.present();
  }

  validateSkill(skillId: number): void {
    let body: any = {
      userId: (this.id ? this.id : this.currentUser.id),
      skillId: skillId
    };
    this.loaderService.presentLoaderDefault('Validation en cours');
    this.skillService.validateSkill(body).subscribe(
      result => {
        /* Change the value for the IHM, to avoid refreshing the page */
        for(let i: number = 0; i < this.profile.skills.length; i++) {
          if(this.profile.skills[i].id === skillId) {
            this.profile.skills[i].validated = true;
          }
        }
        this.toastService.presentToast('Validation effectuée avec succès !', 'success');
        this.loaderService.dismissLoader();
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
        this.loaderService.dismissLoader();
      }
    );
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {navCtrlData: this.navCtrl, connectedUser: _.cloneDeep(this.profile)});
    popover.present({ ev: myEvent });
  }
}
