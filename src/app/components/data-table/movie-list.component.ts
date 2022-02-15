import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  listOfMovies: any = [];
  listOfFavoriteMovies: any = [];
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    // get favorite movies from localStorage
    this.moviesService.getAll().subscribe((data: any) => {
      console.log(data.items);
      this.listOfMovies = data.items;
    });
  }

  toggleClass(event:any, movie:any) {
    event.target.classList.toggle('favorite-class');
    if (this.searchForItemInsideArr(movie.id)) {
      this.removeMovieFromFavoriteList(movie);
    } else {
      this.addMovieToFavoriteList(movie);
    }
  }

  searchForItemInsideArr(movieId: any) {
    return this.listOfFavoriteMovies.some((item:any)=>{
      if(item.id=== movieId){
        return true;
      }else{
        return false;
      }
    });
  }

  addMovieToFavoriteList(movie: any): void {
    this.listOfFavoriteMovies.push(movie);
    console.log(this.listOfFavoriteMovies);
    console.log('element added')
    // Set favorite movie in localStorage.
  }

  removeMovieFromFavoriteList(movieId: any): void {
    let movieIndex = this.listOfFavoriteMovies
    .map((x:any) => {
      return x.Id;
    })
    .indexOf(movieId);

    this.listOfFavoriteMovies.splice(movieIndex, 1);
    console.log('element removed')
    console.log(this.listOfFavoriteMovies);
    // Set favorite movie in localStorage.
  }

}
