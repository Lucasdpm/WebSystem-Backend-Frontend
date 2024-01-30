import { Component } from '@angular/core';
import { UserService } from '../../../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent {

	error: any;

	constructor(public authService: AuthService, private userService: UserService, private router: Router) { }


	get isLogedIn() {
		return this.authService.isLoggedIn()
	}

	logOff() {
		this.authService.logout()
		this.router.navigate(['/login'])
	}
}
