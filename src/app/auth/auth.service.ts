import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId = 'xyz';

  constructor() {}

  //get value of userIsAuthenticated
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  //get userId
  get userId() {
    return this._userId;
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
