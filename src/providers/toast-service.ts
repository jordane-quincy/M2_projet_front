import { Injectable } from '@angular/core';
import { ToastController} from 'ionic-angular';


@Injectable()
export class ToastService {

  constructor(public toastCtrl: ToastController) {

  }

  /**
   * Affiche un toast pendant 3s, au top de l'écran.
   * @param message Contenu du message à afficher
   * @param type type de l'alerte : success (fond vert), alert (fond rouge)
   */
  presentToast(message: string, type: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: type === "alert" ? null : 3000,
      position: "top",
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: `toast-${type}`
    });
    toast.present();
  }

}
