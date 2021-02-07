import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  isAuth: Observable<boolean>;

  constructor(private authService:AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth = this.store.select(fromRoot.getIsAuthenticated)
  }

  sidenavToggle(): void {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }

 
}
