import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userIsAuthenticated = false;

  constructor() {}

  //get user auth status
  get getUserAuthenticated() {
    return this._userIsAuthenticated;
  }

  //login
  login() {
    this._userIsAuthenticated = true;
  }

  //logout
  logout() {
    this._userIsAuthenticated = false;
  }
}
