import { DataLocalService } from './../../services/data-local.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetail, Credit } from './../../interfaces/interfaces';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() id;
  movie: MovieDetail = {};
  credit: Credit
  oculto = 150;
  favorite: boolean = false
  slideOptsActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }
  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private dataService: DataLocalService) { }

   ngOnInit() {
   this.existMovie();
    this.getMovieDetails();
    this.getCredits();

  }
  back() {
    this.modalCtrl.dismiss();
  }
  guardarFavorito() {
    this.dataService.saveMovie(this.movie);
    this.favorite = !this.favorite;
  }
  getMovieDetails() {
    this.moviesService.getMovieDetails(this.id).subscribe(res => {
      this.movie = res;
    })
  }
  getCredits() {
    this.moviesService.getCredits(this.id).subscribe(res => {
      console.log(res);
      this.credit = res;
    })
  }
 async existMovie(){
    this.favorite = await this.dataService.existMovie(this.id)
  }

}
