import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CreateAccountPage } from '../pages/create-account/create-account';
import { NotificationPage } from '../pages/notification/notification';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';
import { Login } from '../pages/login/login';
import { OffersListPage } from '../pages/offers-list/offers-list';
import { OfferDetailsPage } from '../pages/offer-details/offer-details';
import { UserOffersPage } from '../pages/user-offers/user-offers';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../providers/loginService';
import { CreateAccountService } from '../providers/create-account-service';
import { AutocompleSkillsComponent } from '../components/autocomple-skills/autocomple-skills';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MenuPage,
    Login,
    CreateAccountPage,
    OffersListPage,
    OfferDetailsPage,
    UserOffersPage,
    NotificationPage,
    AutocompleSkillsComponent
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
    Login,
    CreateAccountPage,
    OffersListPage,
    OfferDetailsPage,
    UserOffersPage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    CreateAccountService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
