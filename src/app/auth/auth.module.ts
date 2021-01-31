import {NgModule} from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingMoudule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
    declarations: [
      SignupComponent,
      LoginComponent,
    ],
    imports: [
        AngularFireAuthModule,
        SharedModule,
        AuthRoutingMoudule
    ],
    exports: []
    
  })

export class AuthModule {

}