import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LocationPageComponent } from './components/location-page/location-page.component';
import { RatesPageComponent } from './components/rates-page/rates-page.component';
import { ReservationPageComponent } from './components/reservation-page/reservation-page.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { FacilitiesPageComponent } from './components/facilities-page/facilities-page.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
  children: [ {
    path: 'home',
    component: HomePageComponent,
  },{
    path: 'about',
    component: AboutPageComponent,
  },{
    path: 'facilities',
    component: FacilitiesPageComponent,
  }
  ,{
    path: 'location',
    component: LocationPageComponent,
  },{
    path: 'rates',
    component: RatesPageComponent,
  },{
    path: 'reservation',
    component: ReservationPageComponent,
  },{
    path: 'contacts',
    component: ContactsPageComponent,
  }]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
