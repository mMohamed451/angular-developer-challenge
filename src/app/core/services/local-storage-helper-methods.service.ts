import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageHelperMethodsService {
  favoriteMovieList: any = [];

  constructor() {
    this.favoriteMovieList = this.getFavoriteMovieList();
  }

  getFavoriteMovieList() {
    if (localStorage.getItem('favorite-movies') !== null) {
      return JSON.parse(localStorage.getItem('favorite-movies')!);
    }
    this.favoriteMovieList = JSON.parse(
      localStorage.getItem('favorite-movies')!
    );
    return this.favoriteMovieList;
  }

  setFavoriteMovieList(movie: any) {
    if (!this.favoriteMovieList || this.favoriteMovieList.length === 0) {
      this.favoriteMovieList = [];
      this.favoriteMovieList.push(movie);
      localStorage.setItem(
        'favorite-movies',
        JSON.stringify([...this.favoriteMovieList])
      );
      return this.favoriteMovieList;
    } else {
      this.favoriteMovieList = this.getFavoriteMovieList();
      this.favoriteMovieList.forEach((movieItem: any) => {
        if (movieItem.id === movie.id) {
          return;
        }
      });

      let alreadyAdded = false;
      for (let i = 0; i < this.favoriteMovieList.length; i++) {
        if (this.favoriteMovieList[i].id === movie.id) {
          alreadyAdded = true;
          break;
        }
      }
      if (alreadyAdded) {
        return this.favoriteMovieList;
      } else {
        this.favoriteMovieList.push(movie);
        localStorage.setItem(
          'favorite-movies',
          JSON.stringify([...this.favoriteMovieList])
        );
        return this.favoriteMovieList;
      }
    }
  }

  removeMovieFromFavoriteMovieList(movieId: any) {
    let currentFavoriteList: any = this.getFavoriteMovieList();
    let movieIndex = currentFavoriteList
      .map((x: any) => {
        return x.id;
      })
      .indexOf(movieId);

    currentFavoriteList.splice(movieIndex, 1);
    localStorage.setItem(
      'favorite-movies',
      JSON.stringify([...currentFavoriteList])
    );
    return currentFavoriteList;
  }
}
