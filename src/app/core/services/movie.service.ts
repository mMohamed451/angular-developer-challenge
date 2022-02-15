import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {
  }

  getAllMovies() {
    return this.httpClient.get(`${environment.url}/genre/28/movies?api_key=${environment.apiKey}&language=en-US&page=1`);

  }
  searchForSpecificMovie() {
    // allowed values
    // popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc,
    // revenue.desc,primary_release_date.asc, primary_release_date.desc, original_title.asc,
    // original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc
    return this.httpClient.get(`${environment.url}/discover/movie?api_key=${environment.apiKey}&language=en-US&sortby=original_title.desc&page=1`);
  }

  getMovieDetails(movieId: any) {
    return this.httpClient.get(`${environment.url}/movie/${movieId}?api_key=${environment.apiKey}`);
  }


}
