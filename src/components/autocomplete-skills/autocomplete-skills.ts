import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SkillService, ToastService } from '../../providers/index';
import * as _ from 'lodash';


@Component({
  selector: 'autocomplete-skills',
  templateUrl: 'autocomplete-skills.html'
})

/**
 * TODO: comment
 */

export class AutocompleteSkillsComponent implements OnInit {

  text: string;

  completeSkills: any[];

  skills: any[];

  @Input() selectedSkills: Object[];

  @Output() selectedSkillsChange = new EventEmitter<Object>();

  ngOnInit(): void {
    this.getSkillsFromBack();
  }

  constructor(private skillService: SkillService, private toastService: ToastService) {
    // this.completeSkills = [
    //   "JS",
    //   "CSS",
    //   "HTML",
    //   "Anglais",
    //   "React",
    //   "Ionic"
    // ]
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
        return (skill.label.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  addSkill() {
    this.selectedSkills.push({
      label: "",
      customSkill: true
    });
    this.emitUpdateEvent();
  }

  onClickSkill(skill: string) {
    if (!_.find(this.selectedSkills, {label: skill})) {
      this.selectedSkills.push({
        label: skill,
        customSkill: false
      });
      this.emitUpdateEvent();
    }
  }

  deleteSkillFromList(index: number) {
    this.selectedSkills.splice(index, 1);
    this.emitUpdateEvent();
  }

  getSkillsFromBack() {
    this.skillService.getSkills().subscribe(
      res => {
        // initiate this.formationList with the response
        this.completeSkills = (_.cloneDeep(res) || []);
        this.skills = _.cloneDeep(this.completeSkills);
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
      }
    );
  }

}
