import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

/**
 * Premier composant chargé par Ionic, qui redirige vers la rootPage définie et permet de définir des options spécifiques
 */
export class MyApp {
  // La page principale de l'application sera la page de login
  rootPage:any = LoginPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      if(platform.is('ios')){
        statusBar.overlaysWebView(false);
      } else {
        statusBar.styleDefault();
      }

      splashScreen.hide();
    });
  }
}
