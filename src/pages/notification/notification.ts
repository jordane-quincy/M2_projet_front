import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationService, LoaderService, ToastService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  notifList: any[];
  oldNotifList: any[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private notificationService: NotificationService,
    private toastService: ToastService,
    private loaderService: LoaderService
  ) {
  }

  refreshNotificationList() {
    this.notificationService.getNotifications().subscribe(
      result => {
        //devise notif with status READ and status NOTREAD
        this.notifList = _.cloneDeep((result || []).filter(notif => {
          return notif.status === "NOTREAD";
        }));
        this.oldNotifList = _.cloneDeep((result || []).filter(notif => {
          return notif.status === "READ";
        }));
        this.loaderService.dismissLoader();
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
        this.loaderService.dismissLoader();
      }
    );
  }

  ionViewDidLoad() {
    this.refreshNotificationList();
  }

  validateNotification(id: number): void {
    console.log(id);
    this.notificationService.markAsRead(id).subscribe(
      result => {
        this.refreshNotificationList();
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
        this.loaderService.dismissLoader();
      }
    );
  }

}
