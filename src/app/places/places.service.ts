import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  //places array
  private _places = [];

  //get copy of places with getter method
  get places() {
    return [...this._places];
  }

  constructor() {}
}
