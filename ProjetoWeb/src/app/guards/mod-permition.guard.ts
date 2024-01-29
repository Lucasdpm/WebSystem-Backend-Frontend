import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Access } from '../access';
import { AuthHttpService } from '../auth-http.service';

export const modPermitionGuard = () => {
	const userService = inject(UserService)
	const router = inject(Router)

	userService.getCurrentUser().subscribe(user => {
		if (user.access === Access.mod || user.access === Access.admin) {
			router.navigate(['/login']);
			return true
		}
		return false
	})
};
