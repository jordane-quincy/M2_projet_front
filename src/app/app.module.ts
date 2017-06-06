import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { OffersListPage } from '../pages/offers-list/offers-list';
import { UserOffersPage } from '../pages/user-offers/user-offers';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../providers/loginService';
import { CreateAccountService } from '../providers/create-account-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Login,
    CreateAccountPage,
    TabsPage,
    UserOffersPage,
    OffersListPage
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
    HomePage,
    TabsPage,
    Login,
    CreateAccountPage,
    OffersListPage,
    TabsPage,
    UserOffersPage
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
