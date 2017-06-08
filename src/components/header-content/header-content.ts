import { Component, Input } from '@angular/core';
import { UserService } from '../../providers/index';

@Component({
  selector: 'header-content',
  templateUrl: 'header-content.html'
})
export class HeaderContentComponent {

  @Input() title: string;

  constructor(private userService: UserService) {
    
  }

}
