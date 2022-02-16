import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageHelperMethodsService } from 'src/app/core/services/local-storage-helper-methods.service';
import { MoviesService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  listOfMovies: any = [];
  listOfFavoriteMovies: any = [];
  inputFilter: any;
  favoriteMovies: any;
  constructor(private moviesService: MoviesService, private router: Router, private localStorageService: LocalStorageHelperMethodsService) {}

  ngOnInit(): void {
    this.getAllMovies();
    this.listOfFavoriteMovies = this.localStorageService.getFavoriteMovieList();
  }

  doFilter(event: any): void {
    this.inputFilter = event.target.value;
    this.listOfMovies.filter = event.target.value.trim().toLocaleLowerCase();
  }

  addToFavoriteList(event: any, movie: any) {
    if (event.target.classList.value.search('favorite-class') === -1) {
      // add to localstorage
      this.listOfFavoriteMovies = this.localStorageService.setFavoriteMovieList(movie);
      event.target.classList.add('favorite-class');
    } else {
      // remove from localstorage
      this.listOfFavoriteMovies = this.localStorageService.removeMovieFromFavoriteMovieList(movie.id);
      event.target.classList.remove('favorite-class');
    }
  }

  searchForItemInsideArr(movieId: any) {
    return this.listOfFavoriteMovies.some((item: any) => {
      if (item.id === movieId) {
        return true;
      } else {
        return false;
      }
    });
  }

  addMovieToFavoriteList(movie: any): void {
    this.listOfFavoriteMovies.push(movie);
    this.localStorageService.setFavoriteMovieList(movie);
  }

  removeMovieFromFavoriteList(movieId: any): void {
    let movieIndex = this.listOfFavoriteMovies
      .map((x: any) => {
        return x.Id;
      })
      .indexOf(movieId);

    this.listOfFavoriteMovies.splice(movieIndex, 1);
    this.listOfFavoriteMovies = this.localStorageService.removeMovieFromFavoriteMovieList(movieId);

  }

  getAllMovies(): void {
    this.moviesService.getAllMovies().subscribe({
      next: (data: any) => {
        this.listOfMovies = data.results;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  searchForSpecificMovie(): void {
    this.moviesService.searchForSpecificMovie().subscribe({
      next: (data: any) => {
        this.listOfMovies = data.results;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getMovieDetails(movieId: any): void {
    this.moviesService.getMovieDetails(movieId).subscribe({
      next: (data: any) => {
        this.router.navigate([`movie-details/${movieId}`]);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
