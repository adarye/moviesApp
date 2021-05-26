import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Response, Movie } from './../interfaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recentMovies: Movie[] = [];
  popularMovies: Movie[] = []


  constructor(private moviesService: MoviesService) {

  }
  ngOnInit(): void {
    this.moviesService.getFeature().subscribe(res => {
      this.recentMovies = res.results;
    })

    this.getPopulares();
  }
  cargarMas(){
   this.getPopulares();
  }

  getPopulares(){
    this.moviesService.getPopulares().subscribe(res=>{
      // this.popularMovies = res.results;
      const arrTemp = [...this.popularMovies, ...res.results]
      this.popularMovies = arrTemp;
    })
  }

}
