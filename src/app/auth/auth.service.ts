import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../trainning/training.service';
import { UiService } from '../shared/ui.servise';
import * as fromRoot from './../app.reducer';
import * as UI from './../shared/ui.action';
import * as AUTH from './auth.action';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {

  constructor(private router: Router, private angularFireAuth: AngularFireAuth, private trainingService: TrainingService,
    private uiService: UiService, private store: Store<{ ui: fromRoot.State }>) { }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
    this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message, null, 3000);
    });

  }

  initAuthListner() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AUTH.SetAutheticated())
        this.router.navigate(['']);
      } else {
        this.trainingService.canceledSubscription();
        this.store.dispatch(new AUTH.SetUnauthenticated())
        this.router.navigate(['/login']);
      }
    })
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
    this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }


}
