import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
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
    console.log('ionViewDidLoad NotificationPage');
  }

    handleNotifClick(): void {
    console.log('click');
  }

}
