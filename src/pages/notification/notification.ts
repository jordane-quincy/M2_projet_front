import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

    notifList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.notifList = [{
      title: 'title',
      description: 'description'
    },
    {
      title: "autre title",
      description: 'autre description'
    }];
  }

  ionViewDidLoad() {

  }

  handleNotifClick(): void {
    console.log('click');
  }

}
