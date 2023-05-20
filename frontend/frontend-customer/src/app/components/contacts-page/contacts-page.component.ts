import { Component } from '@angular/core';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent {

  constructor(private hotelService: HotelService) { }
  contactInformation!: ContactInformation;

  ngOnInit(): void {
    this.initInformation()
  }

  initInformation(){
    this.hotelService.getHotel(1).subscribe((data: any) => {
      if (data.id == 1) {
        this.contactInformation = Object.assign(new ContactInformation({}), data.item);
        console.log(this.contactInformation.phone);
        
      }
    })

  }

}
