import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getMovieDetails(this.id).subscribe(res=>{
      this.movie = res;
    })
    this.moviesService.getCredits(this.id).subscribe(res=>{

    })
  }

}
