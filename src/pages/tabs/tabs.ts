import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { NotificationPage } from '../notification/notification';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = NotificationPage;
  tab4Root = MenuPage;

  constructor() {

  }
}
