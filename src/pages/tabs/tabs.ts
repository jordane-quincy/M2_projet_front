import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';
import { CreateAccountPage } from '../create-account/create-account'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab3Root = ContactPage;
  tab4Root = MenuPage;
  tab5Root = CreateAccountPage
  constructor() {

  }
}
