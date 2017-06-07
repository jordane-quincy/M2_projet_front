import { Component } from '@angular/core';
import * as _ from 'lodash';
/**
 * Generated class for the AutocompleSkillsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'autocomple-skills',
  templateUrl: 'autocomple-skills.html'
})
export class AutocompleSkillsComponent {

  text: string;

  completeSkills: string[];

  skills: string[];

  selectedSkills: Object[];

  constructor() {
    console.log('Hello AutocompleSkillsComponent Component');
    this.text = 'Hello World';
    this.completeSkills = [
      "JS",
      "CSS",
      "HTML",
      "Anglais",
      "React",
      "Ionic"
    ]
    this.skills = _.cloneDeep(this.completeSkills);
    this.selectedSkills = [];
  }

  getSkills(ev: any) {
    // Reset items back to all of the items
    this.skills = _.cloneDeep(this.completeSkills);
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.skills = this.skills.filter((skill) => {
        return (skill.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onClickSkill(skill: string) {
    if (!_.find(this.selectedSkills, {skillLabel: skill})) {
      console.log(skill);
      this.selectedSkills.push({
        skillLabel: skill,
        skillMark: 0
      });
      console.log(this.selectedSkills);
    }
  }

}
