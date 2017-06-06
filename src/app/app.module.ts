import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CreateAccountPage } from '../pages/create-account/create-account';
import { NotificationPage } from '../pages/notification/notification';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { OffersListPage } from '../pages/offers-list/offers-list';
import { OfferDetailsPage } from '../pages/offer-details/offer-details';
import { UserOffersPage } from '../pages/user-offers/user-offers';

import { AddOfferPage } from '../pages/add-offer/add-offer';

import { ProfilPage } from '../pages/profil/profil';
import { AppointmentPage } from '../pages/appointment/appointment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../providers/loginService';
import { CreateAccountService } from '../providers/create-account-service';

import { ImagePicker } from '@ionic-native/image-picker';

import { AutocompleSkillsComponent } from '../components/autocomple-skills/autocomple-skills';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MenuPage,
    LoginPage,
    CreateAccountPage,
    OffersListPage,
    UserOffersPage,
    AddOfferPage,
    OfferDetailsPage,
    NotificationPage,
    AutocompleSkillsComponent,
    AppointmentPage,
    ProfilPage
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
    MenuPage,
    LoginPage,
    CreateAccountPage,
    OffersListPage,
    UserOffersPage,
    AddOfferPage,
    ProfilPage,
    OfferDetailsPage,
    AppointmentPage,
    NotificationPage
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
