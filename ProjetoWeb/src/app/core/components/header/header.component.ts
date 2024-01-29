import { Component } from '@angular/core';
import { UserService } from '../../../user.service';
import { User } from '../../../user';
import { Router } from '@angular/router';
import { AuthHttpService } from '../../../auth-http.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  loggedUserName: string = ''

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.loggedUserName = this.authService.getCurrentName
  }

  get isLogedIn() {
    return this.authService.isLoggedIn()
  }

  logOff() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
