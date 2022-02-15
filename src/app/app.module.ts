import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  declarations: [
    MovieListComponent,
    AppComponent,
    MovieDetailsComponent,
    StarRatingComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
