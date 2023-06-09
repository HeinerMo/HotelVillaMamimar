import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HotelStatusComponent } from './components/hotel-status/hotel-status.component';
import { PagesComponent } from './components/pages/pages.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RoomAvailabilityComponent } from './components/room-availability/room-availability.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AddAdminsComponent } from './components/add-admins/add-admins.component';
import { ManageSeasonsComponent } from './components/manage-seasons/manage-seasons.component';
import { ManageDiscountsComponent } from './components/manage-discounts/manage-discounts.component';
import { ManageFeedbackComponent } from './components/manage-feedback/manage-feedback.component';
import { ManageRoomtypesComponent } from './components/manage-roomtypes/manage-roomtypes.component';
import { ManageHomePageComponent } from './components/pages/manage-homepage/manage-homepage.component';
import { ManageFacilitiesComponent } from './components/pages/manage-facilities/manage-facilities.component';
import { ManageAboutComponent } from './components/pages/manage-about/manage-about.component';
import { ManageLocationComponent } from './components/pages/manage-location/manage-location.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'status', component: HotelStatusComponent, canActivate:[AuthGuard]},
  { path: 'pages', component: PagesComponent, canActivate:[AuthGuard]},
  { path: 'reservations', component: ReservationsComponent, canActivate:[AuthGuard]},
  { path: 'availability', component: RoomAvailabilityComponent, canActivate:[AuthGuard]},
  { path: 'rooms', component: ManageRoomtypesComponent, canActivate:[AuthGuard]},
  { path: 'advertisement', component: AdvertisementComponent, canActivate:[AuthGuard]},
  { path: 'admins', component: AddAdminsComponent, canActivate:[AuthGuard]},
  { path: 'seasons', component: ManageSeasonsComponent, canActivate:[AuthGuard]},
  { path: 'discounts', component: ManageDiscountsComponent, canActivate:[AuthGuard]},
  { path: 'feedbacks', component: ManageFeedbackComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'manage-homepage', component: ManageHomePageComponent, canActivate:[AuthGuard]},
  { path: 'manage-facilities', component: ManageFacilitiesComponent, canActivate:[AuthGuard]},
  { path: 'manage-about', component: ManageAboutComponent, canActivate:[AuthGuard]},
  { path: 'manage-location', component: ManageLocationComponent, canActivate:[AuthGuard]},
  { path: '**', component: HomeComponent, canActivate:[AuthGuard]}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
