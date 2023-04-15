import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/Hotel';
import { Location } from 'src/app/models/Location';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css']
})
export class LocationPageComponent implements OnInit {

  hotel?: Hotel;

  constructor(private hotelService: HotelService) {
  }


  ngOnInit(): void {
    this.hotelService.getHotel().subscribe((responseDTO) => {
      this.hotel = Object.assign(new Hotel({}), responseDTO.item);
    })
  }
}
