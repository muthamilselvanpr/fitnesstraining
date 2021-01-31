import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../trainning/training.service';
import { UiService } from '../shared/ui.servise';
import * as fromRoot from './../app.reducer';
import * as UI from './../shared/ui.action';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
  private isAuthenticated: boolean = false;
  authChange = new Subject<boolean>();

  constructor(private router:Router, private angularFireAuth:AngularFireAuth, private trainingService: TrainingService, 
    private uiService: UiService, private store: Store<{ui: fromRoot.State}>) {}

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingSTateChange.next(true);
    this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result=>{
      this.store.dispatch(new UI.StopLoading());
      // this.uiService.loadingSTateChange.next(false);
    }).catch(error => {
      this.store.dispatch(new UI.StopLoading());
      // this.uiService.loadingSTateChange.next(false);
      this.uiService.showSnackbar(error.message,null,3000);
     });
    
  }

  initAuthListner() {
    this.angularFireAuth.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigate(['/training']);
      } else {
        this.trainingService.canceledSubscription();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingSTateChange.next(true);
    this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result=>{
      this.store.dispatch(new UI.StopLoading());
      // this.uiService.loadingSTateChange.next(false);
    }).catch(error => {
      // this.uiService.loadingSTateChange.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message,null,3000);
     });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }



  isAuth() {
    return this.isAuthenticated;
  }
}
