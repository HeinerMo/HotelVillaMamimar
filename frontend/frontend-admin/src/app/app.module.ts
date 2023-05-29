import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadingComponent } from './components/heading/heading.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { HomeComponent } from './components/home/home.component';
import { PagesComponent } from './components/pages/pages.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { HotelStatusComponent } from './components/hotel-status/hotel-status.component';
import { RoomAvailabilityComponent } from './components/room-availability/room-availability.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    FooterComponent,
    NavigationMenuComponent,
    HomeComponent,
    PagesComponent,
    ReservationsComponent,
    RoomsComponent,
    HotelStatusComponent,
    RoomAvailabilityComponent,
    AdvertisementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
