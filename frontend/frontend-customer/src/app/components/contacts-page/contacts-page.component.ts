import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactInformation } from 'src/app/models/ContactInformation';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css'],
})
export class ContactsPageComponent {
 
  feedbackControl: FormControl = new FormControl();
  sendFeedbackState:number = -1;

  constructor(private hotelService: HotelService) { }
  contactInformation!: ContactInformation;

  ngOnInit(): void {
    this.feedbackControl.setValidators([Validators.required]);
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

  sendRequest() {
    if (this.feedbackControl.valid) {
      this.hotelService.createFeedback(this.feedbackControl.value).subscribe(data => {
        if (data.id == 1) {
          this.sendFeedbackState = 1;
          this.feedbackControl.disable();
        } else {
          this.sendFeedbackState = 0;
        }
      });
    } else {
      this.feedbackControl.markAsTouched();
    }
  }

}
