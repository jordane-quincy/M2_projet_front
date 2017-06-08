import { Component } from '@angular/core';

import { NotificationPage } from '../notification/notification';
import { MenuPage } from '../menu/menu';
import { LessonSearchPage } from '../lesson-search/lesson-search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = LessonSearchPage;
  tab2Root = NotificationPage;
  tab3Root = MenuPage;

  constructor() {

  }
}
