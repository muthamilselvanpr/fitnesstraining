import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.servise';
import { AuthService } from './../auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate = new Date();
  isLoading: boolean = false;
  loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    this.loadingSubs = this.uiService.loadingSTateChange.subscribe((loader: boolean) => this.isLoading = loader)
  }

  /**
   * get sign up detail
   * @param form values
   */
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email:form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy(): void {
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
  }

}
