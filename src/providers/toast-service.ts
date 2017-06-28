import { Injectable } from '@angular/core';
import { ToastController} from 'ionic-angular';

/**
* Service permettant de factoriser l'utilisation d'un toast pour afficher des messages de succès ou d'erreur
*/
@Injectable()
export class ToastService {

  constructor(public toastCtrl: ToastController) {

  }

  /**
   * Affiche un toast en haut de l'écran.
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
