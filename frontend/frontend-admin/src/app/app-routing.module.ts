import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HotelStatusComponent } from './components/hotel-status/hotel-status.component';
import { PagesComponent } from './components/pages/pages.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RoomAvailabilityComponent } from './components/room-availability/room-availability.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'status', component: HotelStatusComponent, canActivate:[AuthGuard]},
  { path: 'pages', component: PagesComponent, canActivate:[AuthGuard]},
  { path: 'reservations', component: ReservationsComponent, canActivate:[AuthGuard]},
  { path: 'availability', component: RoomAvailabilityComponent, canActivate:[AuthGuard]},
  { path: 'rooms', component: RoomsComponent, canActivate:[AuthGuard]},
  { path: 'advertisement', component: AdvertisementComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', component: HomeComponent, canActivate:[AuthGuard]}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
