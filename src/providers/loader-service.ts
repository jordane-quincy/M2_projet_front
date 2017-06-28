import { Injectable } from '@angular/core';
import { LoadingController} from 'ionic-angular';

/**
 * Service permettant de factoriser l'utilisation d'un loader pendant les temps de chargement
 */
@Injectable()
export class LoaderService {

  loading: any;

  constructor(public loadingCtrl: LoadingController) {

  }

  /**
   * Affiche un spinner pendant les chargements
   * @param message Contenu à afficher dans le loader
   */
  presentLoaderDefault(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();
  }

  /**
   * Cache le spinner de chargement
   */
  dismissLoader(): void {
    this.loading.dismiss();
  }

}
