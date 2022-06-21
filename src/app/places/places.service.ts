import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  private _places = new BehaviorSubject<Place[]>([]);

  // private _places = new BehaviorSubject<Place[]>([
  //   new Place(
  //     'p1',
  //     'Amsterdam',
  //     'Capital of Netherlands',
  //     'http://www.sporcle.com/blog/wp-content/uploads/2018/02/1-14.jpg',
  //     139.99,
  //     new Date('2022-01-01'),
  //     new Date('2022-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p2',
  //     'Roterdam',
  //     `Europe's port to the world.`,
  //     'https://www.ubm-development.com/magazin/wp-content/uploads/2020/12/S_top_PowerhouseCompany_Codrico00_Plomp.jpg',
  //     129.99,
  //     new Date('2022-01-01'),
  //     new Date('2022-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p3',
  //     'Groningen',
  //     'A beautiful historic city',
  //     'https://www.27vakantiedagen.nl/wp-content/uploads/2021/02/groningen-stad.jpg',
  //     129.99,
  //     new Date('2022-01-01'),
  //     new Date('2022-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p4',
  //     'Amsterdam',
  //     'Capital of Netherlands',
  //     'http://www.sporcle.com/blog/wp-content/uploads/2018/02/1-14.jpg',
  //     139.99,
  //     new Date('2022-01-01'),
  //     new Date('2022-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p5',
  //     'Roterdam',
  //     `Europe's port to the world.`,
  //     'https://www.ubm-development.com/magazin/wp-content/uploads/2020/12/S_top_PowerhouseCompany_Codrico00_Plomp.jpg',
  //     129.99,
  //     new Date('2022-01-01'),
  //     new Date('2022-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p6',
  //     'Groningen',
  //     'A beautiful historic city',
  //     'https://www.27vakantiedagen.nl/wp-content/uploads/2021/02/groningen-stad.jpg',
  //     129.99,
  //     new Date('2022-01-01'),
  //     new Date('2022-12-31'),
  //     'abc'
  //   ),
  // ]);

  //get copy of places with getter method
  get places() {
    return this._places.asObservable();
  }

  //get copy of Place that given id
  getPlace(id: string) {
    return this.httpClient
      .get<PlaceData>(
        `https://find-place-dvt-default-rtdb.europe-west1.firebasedatabase.app/offered-places/${id}.json`
      )
      .pipe(
        map((placeData) => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId
          );
        })
      );
  }

  //fetchPlace
  fetchPlace() {
    return this.httpClient
      .get<{ [key: string]: PlaceData }>(
        'https://find-place-dvt-default-rtdb.europe-west1.firebasedatabase.app/offered-places.json'
      )
      .pipe(
        map((responseData) => {
          const places = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  responseData[key].title,
                  responseData[key].description,
                  responseData[key].imageUrl,
                  responseData[key].price,
                  new Date(responseData[key].availableFrom),
                  new Date(responseData[key].availableTo),
                  responseData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap((places) => {
          this._places.next(places);
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
    let generatedId: string;
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

    return this.httpClient
      .post<{ name: string }>(
        'https://find-place-dvt-default-rtdb.europe-west1.firebasedatabase.app/offered-places.json',
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((responseData) => {
          generatedId = responseData.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0) {
          return this.fetchPlace();
        } else {
          return of(places);
        }
      }),
      switchMap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        updatedPlaces = [...places];
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

        return this.httpClient.put(
          `https://find-place-dvt-default-rtdb.europe-west1.firebasedatabase.app/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
