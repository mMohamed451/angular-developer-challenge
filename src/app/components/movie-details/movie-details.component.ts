import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalStorageHelperMethodsService } from 'src/app/core/services/local-storage-helper-methods.service';
import { MoviesService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  reviews: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private router: Router,
    private localStorageService: LocalStorageHelperMethodsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((queryParams: Params) => {
      this.movieService.getMovieDetails(queryParams['id']).subscribe({
        next: (data: any) => {
          this.movie = data;
          this.movieService.getMovieReviews(queryParams['id']).subscribe(
            {
              next: (reviews:any)=> this.reviews = reviews.results,
              error: (err: any) => console.log(err)
            }
          )
        },
        error: (error: any) => {
          this.router.navigate(['']);
        },
      });
    });


  }

  addMovieToFavoriteList(movie: any): void {
    this.localStorageService.setFavoriteMovieList(movie);
  }

  removeMovieFromFavoriteList(movieId: any): void {
    this.localStorageService.removeMovieFromFavoriteMovieList(movieId);

  }
}
