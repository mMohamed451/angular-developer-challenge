import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    // get favorite movies from localStorage
    this.getAllMovies();
  }


  doFilter(event: any): void {
    this.inputFilter = event.target.value;
    this.listOfMovies.filter = event.target.value.trim().toLocaleLowerCase();
  }

  toggleClass(event: any, movie: any) {
    event.target.classList.toggle('favorite-class');
    if (this.searchForItemInsideArr(movie.id)) {
      this.removeMovieFromFavoriteList(movie);
    } else {
      this.addMovieToFavoriteList(movie);
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
    // Set favorite movie in localStorage.
  }

  removeMovieFromFavoriteList(movieId: any): void {
    let movieIndex = this.listOfFavoriteMovies
      .map((x: any) => {
        return x.Id;
      })
      .indexOf(movieId);

    this.listOfFavoriteMovies.splice(movieIndex, 1);
    // Set favorite movie in localStorage.
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
