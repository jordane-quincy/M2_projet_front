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
<<<<<<< HEAD
import { AddOfferPage } from '../pages/add-offer/add-offer';
=======
import { ProfilPage } from '../pages/profil/profil';
import { AppointmentPage } from '../pages/appointment/appointment';
>>>>>>> 6936f4b9b59c5c594b9b3ba01b93a0ec3389f4f3

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../providers/loginService';
import { CreateAccountService } from '../providers/create-account-service';
<<<<<<< HEAD
import { ImagePicker } from '@ionic-native/image-picker';
=======
import { AutocompleSkillsComponent } from '../components/autocomple-skills/autocomple-skills';
>>>>>>> 6936f4b9b59c5c594b9b3ba01b93a0ec3389f4f3

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MenuPage,
    LoginPage,
    CreateAccountPage,
    OffersListPage,
    UserOffersPage,
<<<<<<< HEAD
    AddOfferPage
=======
    OfferDetailsPage,
    NotificationPage,
    AutocompleSkillsComponent,
    AppointmentPage
>>>>>>> 6936f4b9b59c5c594b9b3ba01b93a0ec3389f4f3
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
<<<<<<< HEAD
    AddOfferPage
=======
    ProfilPage,
    OfferDetailsPage,
    AppointmentPage,
    NotificationPage
>>>>>>> 6936f4b9b59c5c594b9b3ba01b93a0ec3389f4f3
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
