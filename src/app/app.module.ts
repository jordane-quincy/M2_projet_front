import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ImagePicker } from '@ionic-native/image-picker';

import { CreateAccountPage } from '../pages/create-account/create-account';
import { CreateAccountSkillsPage } from '../pages/create-account-skills/create-account-skills';
import { ForgottenPasswordPage } from '../pages/forgotten-password/forgotten-password';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { NotificationPage } from '../pages/notification/notification';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { OffersListPage } from '../pages/offers-list/offers-list';
import { OfferDetailsPage } from '../pages/offer-details/offer-details';
import { UserOffersPage } from '../pages/user-offers/user-offers';
import { PendingRequestPage } from '../pages/pending-request/pending-request';
import { AddOfferPage } from '../pages/add-offer/add-offer';
import { ProfilePage } from '../pages/profile/profile';
import { AppointmentPage } from '../pages/appointment/appointment';
import { AddStudentPage } from '../pages/add-student/add-student';
import { LessonSearchPage } from '../pages/lesson-search/lesson-search';
import { PopoverPage } from '../pages/popover/popover';

import { UserService, CreditService, HttpService, TokenService, ToastService, FormationService } from '../providers/index';

import { AutocompleteSkillsComponent } from '../components/autocomplete-skills/autocomplete-skills';
import { HeaderContentComponent } from '../components/header-content/header-content';

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
    OffersListPage,
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
    PopoverPage
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
    OffersListPage,
    UserOffersPage,
    AddOfferPage,
    ProfilePage,
    OfferDetailsPage,
    AppointmentPage,
    NotificationPage,
    PendingRequestPage,
    AddStudentPage,
    LessonSearchPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    CreditService,
    ImagePicker,
    HttpService,
    TokenService,
    ToastService,
    FormationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: Http,
      useFactory: (backend: XHRBackend, options: RequestOptions, tokenService: TokenService) => {
        return new HttpService(backend, options, tokenService);
      },
      deps: [XHRBackend, RequestOptions, TokenService]
    }
  ]
})
export class AppModule {}
