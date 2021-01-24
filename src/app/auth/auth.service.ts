import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Iuser } from './user.model'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  private user: Iuser;
  authChange = new Subject<boolean>();

  constructor(private router:Router) {}

  authSuccessfully() {
    this.router.navigate(['/training']);
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()* 10000).toString()
    };
    this.authChange.next(true);
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()* 10000).toString()
    };
    this.authChange.next(true);
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(){
    return {...this.user}
  }

  isAuth() {
    return this.user != null;
  }
}
