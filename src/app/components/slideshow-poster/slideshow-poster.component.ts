import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';
import { Movie } from './../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() recentMovies: Movie[]
  slidesOptions = {
    slidesPerView: 2.7,
    freeMode: true
  }
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  async seeDetail(id){
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    })

    modal.present();
  }

}
