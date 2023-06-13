import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
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
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { AddAdminsComponent } from './components/add-admins/add-admins.component';
import { ManageSeasonsComponent } from './components/manage-seasons/manage-seasons.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CreateSeasonComponent } from './components/manage-seasons/dialogs/create-season/create-season.component';
import { DeleteSeasonComponent } from './components/manage-seasons/dialogs/delete-season/delete-season.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ModifySeasonComponent } from './components/manage-seasons/dialogs/modify-season/modify-season.component';
import { ManageDiscountsComponent } from './components/manage-discounts/manage-discounts.component';
import { CreateDiscountComponent } from './components/manage-discounts/dialogs/create-discount/create-discount.component';
import { DeleteDiscountComponent } from './components/manage-discounts/dialogs/delete-discount/delete-discount.component';
import { ModifyDiscountComponent } from './components/manage-discounts/dialogs/modify-discount/modify-discount.component';

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
    AdvertisementComponent,
    LoginComponent,
    AddAdminsComponent,
    ManageSeasonsComponent,
    CreateSeasonComponent,
    DeleteSeasonComponent,
    ModifySeasonComponent,
    ManageDiscountsComponent,
    CreateDiscountComponent,
    DeleteDiscountComponent,
    ModifyDiscountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }