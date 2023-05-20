import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { NavbarComponent } from './components/body/navbar/navbar.component';
import { MainMenuComponent } from './components/body/main-menu/main-menu.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RatesPageComponent } from './components/rates-page/rates-page.component';
import { LocationPageComponent } from './components/location-page/location-page.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { ReservationPageComponent } from './components/reservation-page/reservation-page.component';
import { WelcomeSectionComponent } from './components/home-page/welcome-section/welcome-section.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisingSectionComponent } from './components/body/advertising-section/advertising-section.component';
import { FacilitiesPageComponent } from './components/facilities-page/facilities-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerDetailComponent } from './components/reservation-page/customer-detail/customer-detail.component';
import { ReservationConfirmationComponent } from './components/reservation-page/reservation-confirmation/reservation-confirmation.component';
import { RoomChooserComponent } from './components/reservation-page/room-chooser/room-chooser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    NavbarComponent,
    MainMenuComponent,
    AboutPageComponent,
    HomePageComponent,
    RatesPageComponent,
    LocationPageComponent,
    ContactsPageComponent,
    ReservationPageComponent,
    WelcomeSectionComponent,
    AdvertisingSectionComponent,
    FacilitiesPageComponent,
    CustomerDetailComponent,
    ReservationConfirmationComponent,
    RoomChooserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
