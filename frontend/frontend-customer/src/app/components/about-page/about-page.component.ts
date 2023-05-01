import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { toByteArray } from 'base64-js'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  @ViewChild('selectedImageRef') selectedImageRef!: ElementRef;
  selectedImage:SafeUrl = "";
  imagesUrl: SafeUrl[] = [];
  aboutUsMessage = "";

  constructor(private hotelService: HotelService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initGallery();
  }

  initGallery () {
    this.hotelService.getGalleryAbout().subscribe((data: any) => {
      let responseId: number = data.id

      if (responseId == 1) {

        let item: [] = data.item

        item.forEach((aboutImage:any) => {
          let imageEncoded = aboutImage.image.imageData;

          let decodedBytes: Uint8Array;
          const byteArray = new Uint8Array([]);
  
          decodedBytes = toByteArray(imageEncoded);
          const blob = new Blob([decodedBytes], { type: 'image/png' });
          let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
          

          this.imagesUrl.push(url);
          this.selectedImageRef.nativeElement.src = url;
        });
        
        this.setSelectedImage(this.imagesUrl[0]);
      }
    });

    this.hotelService.getHotel(1).subscribe((data: any) => {
      if (data.id == 1) {
        this.aboutUsMessage = data.item.aboutMessage;     
      }
    })
  }

  setSelectedImage(imageUrl: SafeUrl) {
    this.selectedImage = imageUrl;
  }
}
