import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HotelStatusComponent } from './components/hotel-status/hotel-status.component';
import { PagesComponent } from './components/pages/pages.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RoomAvailabilityComponent } from './components/room-availability/room-availability.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'status', component: HotelStatusComponent},
  { path: 'pages', component: PagesComponent},
  { path: 'reservations', component: ReservationsComponent},
  { path: 'availability', component: RoomAvailabilityComponent},
  { path: 'rooms', component: RoomsComponent},
  { path: 'advertisement', component: AdvertisementComponent},
  { path: '**', component: HomeComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
