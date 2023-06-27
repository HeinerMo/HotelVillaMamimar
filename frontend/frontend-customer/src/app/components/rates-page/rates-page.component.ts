import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { toByteArray } from 'base64-js'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RoomType } from 'src/app/models/RoomType';
import { RoomTypeService } from 'src/app/services/roomType.service';


@Component({
  selector: 'app-rates-page',
  templateUrl: './rates-page.component.html',
  styleUrls: ['./rates-page.component.css']
})
export class RatesPageComponent implements OnInit {

  roomTypes: RoomType[] = [];

  constructor(private roomTypeService: RoomTypeService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.initRoomTypes();
  }

  initRoomTypes() {
    this.roomTypeService.getRoomTypes().subscribe((data: any) => {
      let responseId: number = data.id

      if (responseId == 1) {
        let item: [] = data.item

        item.forEach((roomType: any) => {
          
          let name = roomType.name;
          let description = roomType.description;
          let price = roomType.price;
          let discount = roomType.discount;
          let finalPrice = roomType.finalPrice;
          let image = roomType.roomTypeImages[0].image;

          let decodedBytes: Uint8Array;
          decodedBytes = toByteArray(image.imageData);
          const blob = new Blob([decodedBytes], { type: 'image/jpg' });
          let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));

          this.createRoomTypes(new RoomType({ name: name, price: price, image: url, description: description, discountPercentage: discount, finalPrice: finalPrice }))

        });

      }

    });
  }

  createRoomTypes(roomType: RoomType) {
    this.roomTypes.push(roomType);
  }

}
