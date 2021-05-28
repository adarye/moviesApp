import { MovieDetail, Genre } from './../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  movies = []
  genres: Genre[] = [];
  orderedMovies: any[] = [];
  constructor(private dataService: DataLocalService, private moviesService: MoviesService) { }

  async ionViewWillEnter(){
    this.movies = await this.dataService.loadFavorites();
    this.genres = await this.moviesService.getGenres();
    this.filterMovies(this.movies, this.genres)
  }



  filterMovies(movies: any[], genres: Genre[]) {
    this.orderedMovies = []
    for (let index = 0; index < genres.length; index++) {
      movies.forEach(movie => {
        const movieGenres = movie.genres;
        let filteredMovies = movieGenres.filter(m => m.id === genres[index].id)
        if (filteredMovies.length > 0) {
          let filteredGenres = this.orderedMovies.filter(m => m.id === genres[index].id)
          if (filteredGenres.length > 0) {
            this.orderedMovies.forEach((element, i) => {
              if (filteredGenres[0].id === element.id) {
                this.orderedMovies[i].movies.push(movie)
              }
            });
          } else {
            this.orderedMovies.push({ 'genre': genres[index].name, 'id': genres[index].id, 'movies': [movie] })
          }

        }
      });
    }
    console.log(this.orderedMovies);
  }
}
