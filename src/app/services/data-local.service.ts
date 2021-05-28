import { MovieDetail } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {


  movies: MovieDetail[] = []
  constructor(private storage: Storage, public toastCtrl: ToastController) {
    this.init();
    this.loadFavorites();
  }
  async init() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  async saveMovie(movie: MovieDetail) {
    let existe = false;
    let mensaje = ''
    for (const peli of this.movies) {
      if (movie.id === peli.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.movies = this.movies.filter(peli => peli.id !== movie.id);
      mensaje = 'Removido de favoritos'
    }
    else {
      this.movies.push(movie);
      mensaje = 'Agregada a favoritos'
    }
    this.storage.set('movies', this.movies);
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      color: 'primary'
    });
    toast.present();
  }

  async loadFavorites() {
    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    return this.movies;

  }

  async existMovie(id) {
    id = Number(id);

    await this.loadFavorites();
    const exist = this.movies.find(peli => peli.id === id)
    return (exist) ? true : false;
  }


}
