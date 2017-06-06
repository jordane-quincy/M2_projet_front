import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { NotificationPage } from '../pages/notification/notification';
import { HomePage } from '../pages/home/home';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { OffersListPage } from '../pages/offers-list/offers-list';
import { UserOffersPage } from '../pages/user-offers/user-offers';
import { AddOfferPage } from '../pages/add-offer/add-offer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../providers/loginService';
import { CreateAccountService } from '../providers/create-account-service';
import { ImagePicker } from '@ionic-native/image-picker';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    NotificationPage,
    HomePage,
    TabsPage,
    MenuPage,
    LoginPage,
    CreateAccountPage,
    OffersListPage,
    UserOffersPage,
    AddOfferPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    NotificationPage,
    HomePage,
    TabsPage,
    MenuPage,
    LoginPage,
    CreateAccountPage,
    OffersListPage,
    UserOffersPage,
    AddOfferPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    CreateAccountService,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
