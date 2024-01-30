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
export class HeaderComponent {
	loggedUserName: string = ''
	error: any;

	constructor(private authService: AuthService, private userService: UserService, private router: Router) {
		this.userService.getCurrentUser().subscribe(user => {
			this.loggedUserName = user.name
		}, (err) => {
			this.error = `Erro ao carregar usuario. StackTrace: ${err}`
		})
	}

	get isLogedIn() {
		return this.authService.isLoggedIn()
	}

	logOff() {
		this.authService.logout()
		this.router.navigate(['/login'])
	}
}
