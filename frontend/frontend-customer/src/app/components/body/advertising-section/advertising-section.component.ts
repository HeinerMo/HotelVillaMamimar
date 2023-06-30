import { Component, OnInit,ElementRef } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Advertisement } from 'src/app/models/Advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { toByteArray } from 'base64-js'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-advertising-section',
  templateUrl: './advertising-section.component.html',
  styleUrls: ['./advertising-section.component.css']
})
export class AdvertisingSectionComponent  implements OnInit{

  advertising: Advertisement[] = [];

  constructor(config: NgbCarouselConfig, private advertisementService: AdvertisementService, private sanitizer: DomSanitizer){
    config.interval = 3000;
   
  }

  ngOnInit(): void {
    this.initAdvertisement();
  }

  initAdvertisement () {
    this.advertisementService.getAdvertisement().subscribe((data: any) => {
      let responseId: number = data.id

      if (responseId == 1) {
        let item: [] = data.item
        
        let link: any;
        let image:any;

        item.forEach((ad:any) => {
          link = ad.url;
          image = ad.advertisementImages;
          
          let decodedBytes: Uint8Array;
          decodedBytes = toByteArray(image[0].image.imageData);
          const blob = new Blob([decodedBytes], { type: 'image/jpg' });
          let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  
         this.createAdvertise(new Advertisement({image:url, url:link}))
         
        });
      }

    });

  }

  createAdvertise(ad :Advertisement){
    this.advertising.push(ad);
  }

  
}
