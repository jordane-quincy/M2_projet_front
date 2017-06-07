import { Component } from '@angular/core';
import * as _ from 'lodash';


@Component({
  selector: 'autocomplete-skills',
  templateUrl: 'autocomplete-skills.html'
})
export class AutocompleteSkillsComponent {

  text: string;

  completeSkills: string[];

  skills: string[];

  selectedSkills: Object[];

  constructor() {
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

  addSkill() {
    this.selectedSkills.push({
      skillLabel: "",
      skillMark: 0,
      customSkill: true
    });
    console.log(this.selectedSkills);
  }

  onClickSkill(skill: string) {
    if (!_.find(this.selectedSkills, {skillLabel: skill})) {
      this.selectedSkills.push({
        skillLabel: skill,
        skillMark: 0,
        customSkill: false
      });
    }
  }

  deleteSkillFromList(index: number) {
    this.selectedSkills.splice(index, 1);
  }

}
