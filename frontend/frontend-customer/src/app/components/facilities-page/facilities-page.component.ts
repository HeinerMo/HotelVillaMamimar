import { Component } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { toByteArray } from 'base64-js'
import { Facility } from 'src/app/models/Facility';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-facilities-page',
  templateUrl: './facilities-page.component.html',
  styleUrls: ['./facilities-page.component.css']
})
export class FacilitiesPageComponent {

  facilities: Facility[] = [];



  constructor(private hotelService: HotelService, private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.initAdvertisement();
  }

  initAdvertisement () {
    this.hotelService.getFacilities().subscribe((data: any) => {
      let responseId: number = data.id

      if (responseId == 1) {
        let item: [] = data.item
        
        let description: any;
        let image:any;

        //console.log(item)

        item.forEach((a:any) => {
          let objeto = Object.entries(a);
          description = objeto[1][1];
          image = objeto[2][1];
          
          let decodedBytes: Uint8Array;
          decodedBytes = toByteArray(image[0].image.imageData);
          const blob = new Blob([decodedBytes], { type: 'image/jpg' });
          let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
          //console.log(url);
         this.createFacility(new Facility({description:description, image:url}))
         
        });
      }

    });

  }

  createFacility(ad :Facility){
    this.facilities.push(ad);
  }

}
