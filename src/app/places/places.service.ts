import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Amsterdam',
      'Capital of Netherlands',
      'http://www.sporcle.com/blog/wp-content/uploads/2018/02/1-14.jpg',
      139.99,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Roterdam',
      `Europe's port to the world.`,
      'https://www.ubm-development.com/magazin/wp-content/uploads/2020/12/S_top_PowerhouseCompany_Codrico00_Plomp.jpg',
      129.99,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'Groningen',
      'A beautiful historic city',
      'https://www.27vakantiedagen.nl/wp-content/uploads/2021/02/groningen-stad.jpg',
      129.99,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
      'abc'
    ),
    new Place(
      'p4',
      'Amsterdam',
      'Capital of Netherlands',
      'http://www.sporcle.com/blog/wp-content/uploads/2018/02/1-14.jpg',
      139.99,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
      'abc'
    ),
    new Place(
      'p5',
      'Roterdam',
      `Europe's port to the world.`,
      'https://www.ubm-development.com/magazin/wp-content/uploads/2020/12/S_top_PowerhouseCompany_Codrico00_Plomp.jpg',
      129.99,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
      'abc'
    ),
    new Place(
      'p6',
      'Groningen',
      'A beautiful historic city',
      'https://www.27vakantiedagen.nl/wp-content/uploads/2021/02/groningen-stad.jpg',
      129.99,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
      'abc'
    ),
  ]);

  constructor(private authService: AuthService) {}

  //get copy of places with getter method
  get places() {
    return this._places.asObservable();
  }

  //get copy of Place that given id
  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }

  //addPlace
  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://seniorenplatformgouda.nl/wp-content/uploads/2020/10/gouda-oude-centrum_574_xl.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
