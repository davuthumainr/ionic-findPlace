import { Injectable } from '@angular/core';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  //places array
  private _places: Place[] = [
    new Place(
      'p1',
      'Amsterdam',
      'Capital of Netherlands',
      'http://www.sporcle.com/blog/wp-content/uploads/2018/02/1-14.jpg',
      139.99
    ),
    new Place(
      'p2',
      'Roterdam',
      `Europe's port to the world.`,
      'https://www.ubm-development.com/magazin/wp-content/uploads/2020/12/S_top_PowerhouseCompany_Codrico00_Plomp.jpg',
      129.99
    ),
    new Place(
      'p3',
      'Groningen',
      'A beautiful historic city',
      'https://www.27vakantiedagen.nl/wp-content/uploads/2021/02/groningen-stad.jpg',
      129.99
    ),
    new Place(
      'p4',
      'Amsterdam',
      'Capital of Netherlands',
      'http://www.sporcle.com/blog/wp-content/uploads/2018/02/1-14.jpg',
      139.99
    ),
    new Place(
      'p5',
      'Roterdam',
      `Europe's port to the world.`,
      'https://www.ubm-development.com/magazin/wp-content/uploads/2020/12/S_top_PowerhouseCompany_Codrico00_Plomp.jpg',
      129.99
    ),
    new Place(
      'p6',
      'Groningen',
      'A beautiful historic city',
      'https://www.27vakantiedagen.nl/wp-content/uploads/2021/02/groningen-stad.jpg',
      129.99
    ),
  ];

  constructor() {}

  //get copy of places with getter method
  get getPlaces() {
    return [...this._places];
  }

  //get copy of Place that given id
  getPlace(id: string) {
    return { ...this._places.find((p) => p.id === id) };
  }
}
