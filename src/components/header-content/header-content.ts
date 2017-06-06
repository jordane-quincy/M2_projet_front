import { Component, Input } from '@angular/core';
import { CreditProvider } from '../../providers/credit-service';

@Component({
  selector: 'header-content',
  templateUrl: 'header-content.html'
})
export class HeaderContentComponent {

  @Input() title: string;

  constructor(private creditService: CreditProvider) {
    
  }

}
