import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';


@Component({
  selector: 'autocomplete-skills',
  templateUrl: 'autocomplete-skills.html'
})
export class AutocompleteSkillsComponent {

  text: string;

  completeSkills: string[];

  skills: string[];

  @Input() selectedSkills: Object[];

  @Output() selectedSkillsChange = new EventEmitter<Object>();

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

  emitUpdateEvent() {
    this.selectedSkillsChange.emit(this.selectedSkills);
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
      customSkill: true
    });
    this.emitUpdateEvent();
  }

  onClickSkill(skill: string) {
    if (!_.find(this.selectedSkills, {skillLabel: skill})) {
      this.selectedSkills.push({
        skillLabel: skill,
        customSkill: false
      });
      this.emitUpdateEvent();
    }
  }

  deleteSkillFromList(index: number) {
    this.selectedSkills.splice(index, 1);
    this.emitUpdateEvent();
  }

}
