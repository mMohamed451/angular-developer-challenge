import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {
  @Input('rating')  rating: number = 3;
  @Input('starCount')  starCount: number = 5;
  @Input('color')  color: string = 'accent';


   snackBarDuration: number = 2000;
   ratingArr:any = [];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log("a "+this.starCount)
    for (let index:any = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }


  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }


}
