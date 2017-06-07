import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateAccountService } from '../../providers/create-account-service';
import * as _ from 'lodash';

@Component({
  selector: 'page-create-account-skills',
  templateUrl: 'create-account-skills.html',
})
export class CreateAccountSkillsPage {

  user: any;

  selectedSkills: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private createAccountService: CreateAccountService) {
    this.user = _.cloneDeep(navParams.get('user'));
    this.selectedSkills = [];
  }

  ionViewDidLoad() {
  }

  createAccount() {
    this.user.skills = _.cloneDeep(this.selectedSkills);
    (this.user.skills || []).map(skill => {
      delete(skill.customSkill);
    });
    this.createAccountService.createAccount(this.user).subscribe(
      res => {
        console.log("success");
      },
      err => {
        console.log("err");
      }
    );
  }

}
