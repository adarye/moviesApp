import { Response, Movie } from './../interfaces/interfaces';
import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { DetailComponent } from '../components/detail/detail.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ideas: string[] = ['Spiderman', 'Avenger', 'El Señor de los Anillos', 'La Vida es Bella']
  textoBuscar: string = ''
  results: Movie[] = [];
  constructor(private moviesService: MoviesService, private modalCtrl:ModalController) { }

  search(event) {
    this.results = [];
    this.textoBuscar = event.detail.value;
    if (this.textoBuscar.length != 0) {
      this.moviesService.searchMovie(this.textoBuscar).subscribe((res: Response) => {
        this.results = res.results
      })
    }
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
