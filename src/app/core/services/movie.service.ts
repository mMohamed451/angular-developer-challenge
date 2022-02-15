import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get(`${environment.url}/list/28?api_key=a4ed346006dda92684ce78b778cff272&language=en-US&page=2`);
  }


}
