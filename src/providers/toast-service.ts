import { Injectable } from '@angular/core';
import { ToastController} from 'ionic-angular';


@Injectable()
export class ToastService {

  constructor(public toastCtrl: ToastController) {

  }

  presentToast(message: string, type: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top",
      cssClass: `toast-${type}`
    });
    toast.present();
  }

}