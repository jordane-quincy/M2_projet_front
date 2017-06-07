import { Component } from '@angular/core';

import { NotificationPage } from '../notification/notification';
import { MenuPage } from '../menu/menu';
import { OffersListPage } from '../offers-list/offers-list';
import { LoginPage } from '../login/login';
import { LessonSearchPage } from '../lesson-search/lesson-search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = OffersListPage;
  tab2Root = LessonSearchPage;
  tab3Root = NotificationPage;
  tab4Root = MenuPage;
  tab5Root = LoginPage;

  constructor() {

  }
}
