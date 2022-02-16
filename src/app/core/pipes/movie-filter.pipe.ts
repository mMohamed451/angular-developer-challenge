import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
  transform(moviesList: [], searchTerm: any): any {
    if (!moviesList || !searchTerm) {
      return moviesList;
    } else {
      let newArr: any = [];
      moviesList.map((element: any) => {
        if (
          element.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        ) {
          newArr.push(element);
        }
      });
      return newArr;
    }
  }
}
