import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  getAllMovies() {
    return this.httpClient.get(
      `${environment.url}/genre/28/movies?api_key=${environment.apiKey}&language=en-US&page=1`
    );
  }
  searchForSpecificMovie() {
    return this.httpClient.get(
      `${environment.url}/discover/movie?api_key=${environment.apiKey}&language=en-US&sortby=original_title.desc&page=1`
    );
  }

  getMovieDetails(movieId: any) {
    return this.httpClient.get(
      `${environment.url}/movie/${movieId}?api_key=${environment.apiKey}`
    );
  }

  getMovieReviews(movieId: any) {
    return this.httpClient.get(
      `${environment.url}/movie/${movieId}/reviews?api_key=${environment.apiKey}`
    );
  }
}
