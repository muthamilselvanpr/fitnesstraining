import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  maxDate = new Date();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
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

}
