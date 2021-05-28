
import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

import { Response, MovieDetail, Credit, Genre } from './../interfaces/interfaces';
const apiKey = environment.apiKey;
const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  popularesPage: number = 0;
  genres: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(params: string) {

    let query = url + params + `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query)
  }
  getFeature() {
    const today = new Date();

    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    let monthString;
    let month = today.getMonth() + 1;
    monthString = String(month).padStart(2, '0');

    const inicio = `${today.getFullYear()}-${monthString}-01`
    const fin = `${today.getFullYear()}-${monthString}-${lastDay}`

    return this.ejecutarQuery<Response>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);

  }
  getPopulares() {
    this.popularesPage++
    return this.ejecutarQuery<Response>(`/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`)
  }
  getMovieDetails(id: string) {
    return this.ejecutarQuery<MovieDetail>(`/movie/${id}?`)
  }
  getCredits(id: string) {
    return this.ejecutarQuery<Credit>(`/movie/${id}/credits?`)
  }
  searchMovie(param: string) {

    return this.ejecutarQuery<Response>(`/search/movie?query=${param}`)

  }
  getGenres(): Promise <Genre[]> {

    return new Promise(resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(res => {
        this.genres = res['genres']
        resolve(this.genres);
      })
    })

  }
}
