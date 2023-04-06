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
    ReservationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
