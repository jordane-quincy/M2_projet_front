import { Component } from '@angular/core';

import { NotificationPage } from '../notification/notification';
import { MenuPage } from '../menu/menu';
import { OffersListPage } from '../offers-list/offers-list';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = OffersListPage;
  tab2Root = NotificationPage;
  tab3Root = MenuPage;
  tab4Root = LoginPage;

  constructor() {

  }
}
