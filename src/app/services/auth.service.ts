import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserdetails() {
    return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  }

  setDataInLocalStorage(variableName, data) {
    localStorage.setItem(variableName, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearStorage() {
    localStorage.clear();
  }
}
