import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { toByteArray } from 'base64-js';
import { HotelService } from 'src/app/services/hotel.service';

interface IHotelInformation {
  id?: number;
  welcomeMessage: string
}

@Component({
  selector: 'app-welcome-section',
  templateUrl: './welcome-section.component.html',
  styleUrls: ['./welcome-section.component.css']
})
export class WelcomeSectionComponent implements OnInit{

  hotelInformation: IHotelInformation = {
    welcomeMessage: ''
  };

  imageURL: SafeUrl = '';

  constructor(
    private sanitizer: DomSanitizer,
    private hotelService: HotelService
    ) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.hotelService.getHotel(1).subscribe((data:any) => {
      if (data.id == 1) {
        this.hotelInformation.id = data.item.id;
        this.hotelInformation.welcomeMessage = data.item.welcomeMessage;
      }
    });

    this.hotelService.getWelcomeImage().subscribe((data: any) => {
      if (data.id == 1) {
        let imageEncoded = data.item.image.imageData!;

        let decodedBytes: Uint8Array;
    
        decodedBytes = toByteArray(imageEncoded);
        const blob = new Blob([decodedBytes], { type: 'image/png' });
        let safeURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        this.imageURL = safeURL;
      }
    });   
  }

}
