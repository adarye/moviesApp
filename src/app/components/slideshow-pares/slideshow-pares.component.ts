import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';
import { Movie } from './../../interfaces/interfaces';


@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() popularMovies: Movie[];
  @Output() cargarMas = new EventEmitter();
  slidesOptions = {
    slidesPerView: 2.7,
    freeMode: true,
    spaceBetwen: -10
  }
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() { }
  onClick() {
    this.cargarMas.emit();
  }
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
