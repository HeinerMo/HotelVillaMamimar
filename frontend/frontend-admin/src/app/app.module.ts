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
import { ManageFeedbackComponent } from './components/manage-feedback/manage-feedback.component';
import { DeleteFeedbackComponent } from './components/manage-feedback/dialogs/delete-feedback/delete-feedback.component';
import { MoreFeedbackComponent } from './components/manage-feedback/dialogs/more-feedback/more-feedback.component';
import { ManageRoomtypesComponent } from './components/manage-roomtypes/manage-roomtypes.component';
import { MoreRoomtypesComponent } from './components/manage-roomtypes/dialogs/more-roomtypes/more-roomtypes.component';
import { DeleteRoomtypesComponent } from './components/manage-roomtypes/dialogs/delete-roomtypes/delete-roomtypes.component';
import { CreateRoomtypeComponent } from './components/manage-roomtypes/dialogs/create-roomtype/create-roomtype.component';
import { CreateAdvertisementComponent } from './components/advertisement/dialogs/create-advertisement/create-advertisement.component';
import { DeleteAdvertisementComponent } from './components/advertisement/dialogs/delete-advertisement/delete-advertisement.component';
import { ModifyAdvertisementComponent } from './components/advertisement/dialogs/edit-advertisement/edit-advertisement.component';
import { ModifyRoomtypeComponent } from './components/manage-roomtypes/dialogs/modify-roomtype/modify-roomtype.component';
import { ManageRoomComponent } from './components/manage-roomtypes/manage-room/manage-room.component';
import { ModifyRoomComponent } from './components/manage-roomtypes/manage-room/dialogs/modify-room/modify-room.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ManageHomePageComponent } from './components/pages/manage-homepage/manage-homepage.component';
import { ManageFacilitiesComponent } from './components/pages/manage-facilities/manage-facilities.component';
import { DeleteFacilityComponent } from './components/pages/manage-facilities/dialogs/delete-facility/delete-facility.component';
import { CreateFacilityComponent } from './components/pages/manage-facilities/dialogs/create-facility/create-facility.component';
import { ModifyFacilityComponent } from './components/pages/manage-facilities/dialogs/modify-facility/modify-facility.component';
import { ManageAboutComponent } from './components/pages/manage-about/manage-about.component';
import { ManageLocationComponent } from './components/pages/manage-location/manage-location.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    FooterComponent,
    NavigationMenuComponent,
    HomeComponent,
    PagesComponent,
    ReservationsComponent,
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
    ManageFeedbackComponent,
    DeleteFeedbackComponent,
    MoreFeedbackComponent,
    ManageRoomtypesComponent,
    MoreRoomtypesComponent,
    CreateRoomtypeComponent,
    CreateAdvertisementComponent,
    DeleteAdvertisementComponent,
    DeleteRoomtypesComponent,
    ModifyAdvertisementComponent,
    ModifyRoomtypeComponent,
    ManageRoomComponent,
    ModifyRoomComponent,
    ManageHomePageComponent,
    ManageFacilitiesComponent,
    DeleteFacilityComponent,
    CreateFacilityComponent,
    ModifyFacilityComponent,
    ManageAboutComponent,
    ManageLocationComponent,
  ],
  imports: [
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
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }