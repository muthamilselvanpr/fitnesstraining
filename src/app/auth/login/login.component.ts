import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth.service';
import {  Observable } from 'rxjs';
import * as fromRoot from './../../app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(private authService:AuthService,  private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // .subscribe(data => this.isLoading$ = data)
    // this.loadingSubs = this.uiService.loadingSTateChange.subscribe((loader: boolean) => this.isLoading = loader)
  }

  /**
   * get sign up detail
   * @param form values
   */
  onSubmit(form: NgForm) {
    this.authService.login({
      email:form.value.email,
      password:form.value.password,
    });
  }

}
