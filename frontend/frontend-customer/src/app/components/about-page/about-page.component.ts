import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  selectedImage:string = "";
  imagesUrl: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.imagesUrl = this.getGallery();
    this.setSelectedImage(this.imagesUrl[0]);
  }

  setSelectedImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  getGallery(): string[]{

    let photos = [
      'https://scontent.fsyq1-1.fna.fbcdn.net/v/t39.30808-6/277767581_390083209788177_9101673453261793744_n.jpg?stp=c52.0.206.206a_dst-jpg_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=da31f3&_nc_ohc=PseZSOmYb3QAX873RAC&_nc_ht=scontent.fsyq1-1.fna&oh=00_AfD8i_4leQKv_N8HwQ_Dv-azM1C8mmZEqWgUcKKKsae6Jw&oe=643656FB',
      'https://scontent.fsyq1-1.fna.fbcdn.net/v/t39.30808-6/277783742_390077919788706_3184878751978424003_n.jpg?stp=c34.0.206.206a_dst-jpg_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=da31f3&_nc_ohc=VS_EB2bRXakAX_LEI4Z&_nc_ht=scontent.fsyq1-1.fna&oh=00_AfBIA03K6L_Fmj-AWZ3dFrK99lN4Jl5agnwVL5Mk7mfAMA&oe=6434CDDA',
      'https://scontent.fsyq1-1.fna.fbcdn.net/v/t39.30808-6/277783041_390078263122005_6366664965857503326_n.jpg?stp=c0.23.206.206a_dst-jpg_p206x206&_nc_cat=101&ccb=1-7&_nc_sid=da31f3&_nc_ohc=115jjlI95HUAX_HqJH6&_nc_ht=scontent.fsyq1-1.fna&oh=00_AfDh7D-dvloyJX9susM2539Xrc_drIaHPIDim_j-UE1YcQ&oe=64366FEC',
      'https://scontent.fsyq1-1.fna.fbcdn.net/v/t39.30808-6/277793026_390072283122603_7370032392973128453_n.jpg?stp=c0.23.206.206a_dst-jpg_p206x206&_nc_cat=110&ccb=1-7&_nc_sid=da31f3&_nc_ohc=YSWOzw2zBPYAX-W21c-&_nc_ht=scontent.fsyq1-1.fna&oh=00_AfCRBy3Gr5w9kn08cdoEGjF30iW0aF6sJXp3crKCx--cWQ&oe=6436412F',
      'https://scontent.fsyq1-1.fna.fbcdn.net/v/t39.30808-6/277767581_390083209788177_9101673453261793744_n.jpg?stp=c52.0.206.206a_dst-jpg_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=da31f3&_nc_ohc=PseZSOmYb3QAX873RAC&_nc_ht=scontent.fsyq1-1.fna&oh=00_AfD8i_4leQKv_N8HwQ_Dv-azM1C8mmZEqWgUcKKKsae6Jw&oe=643656FB',
      'https://scontent.fsyq1-1.fna.fbcdn.net/v/t39.30808-6/277783742_390077919788706_3184878751978424003_n.jpg?stp=c34.0.206.206a_dst-jpg_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=da31f3&_nc_ohc=VS_EB2bRXakAX_LEI4Z&_nc_ht=scontent.fsyq1-1.fna&oh=00_AfBIA03K6L_Fmj-AWZ3dFrK99lN4Jl5agnwVL5Mk7mfAMA&oe=6434CDDA',
      
    ]
    
    return photos;
  }

}
