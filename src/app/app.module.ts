import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CreateAccountPage } from '../pages/create-account/create-account';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { OffersListPage } from '../pages/offers-list/offers-list';
import { OfferDetailsPage } from '../pages/offer-details/offer-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../providers/loginService';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    Login,
    CreateAccountPage,
    OffersListPage,
    OfferDetailsPage
    ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    Login,
    CreateAccountPage,
    OffersListPage,
    OfferDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
