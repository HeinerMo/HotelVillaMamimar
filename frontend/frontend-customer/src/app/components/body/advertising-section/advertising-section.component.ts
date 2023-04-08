import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advertising-section',
  templateUrl: './advertising-section.component.html',
  styleUrls: ['./advertising-section.component.css']
})
export class AdvertisingSectionComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig){
    config.interval = 3000;
  }
}
