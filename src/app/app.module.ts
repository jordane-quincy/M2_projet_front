import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CreateAccountPage } from '../pages/create-account/create-account';
import { CreateAccountSkillsPage } from '../pages/create-account-skills/create-account-skills';
import { ForgottenPasswordPage } from '../pages/forgotten-password/forgotten-password';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { NotificationPage } from '../pages/notification/notification';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { OfferDetailsPage } from '../pages/offer-details/offer-details';
import { UserOffersPage } from '../pages/user-offers/user-offers';
import { PendingRequestPage } from '../pages/pending-request/pending-request';
import { AddOfferPage } from '../pages/add-offer/add-offer';
import { ProfilePage } from '../pages/profile/profile';
import { AppointmentPage } from '../pages/appointment/appointment';
import { AddStudentPage } from '../pages/add-student/add-student';
import { LessonSearchPage } from '../pages/lesson-search/lesson-search';
import { PopoverPage } from '../pages/popover/popover';
import { AddCommentPage } from '../pages/add-comment/add-comment';

import {
  UserService,
  HttpService,
  TokenService,
  ToastService,
  AuthService,
  FormationService,
  SkillService,
  OfferService,
  NotificationService,
  LoaderService
} from '../providers/index';

import { AutocompleteSkillsComponent } from '../components/autocomplete-skills/autocomplete-skills';
import { HeaderContentComponent } from '../components/header-content/header-content';
import { DomainsService } from '../providers/domains-service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MenuPage,
    LoginPage,
    CreateAccountPage,
    CreateAccountSkillsPage,
    ForgottenPasswordPage,
    ResetPasswordPage,
    UserOffersPage,
    AddOfferPage,
    OfferDetailsPage,
    UserOffersPage,
    NotificationPage,
    HeaderContentComponent,
    AutocompleteSkillsComponent,
    AppointmentPage,
    ProfilePage,
    PendingRequestPage,
    AddStudentPage,
    LessonSearchPage,
    PopoverPage,
    AddCommentPage
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
    CreateAccountSkillsPage,
    ForgottenPasswordPage,
    ResetPasswordPage,
    UserOffersPage,
    AddOfferPage,
    ProfilePage,
    OfferDetailsPage,
    AppointmentPage,
    NotificationPage,
    PendingRequestPage,
    AddStudentPage,
    LessonSearchPage,
    PopoverPage,
    AddCommentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    HttpService,
    TokenService,
    ToastService,
    AuthService,
    FormationService,
    OfferService,
    SkillService,
    LoaderService,
    NotificationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Http, useClass: HttpService},
    DomainsService
  ]
})
export class AppModule {}
