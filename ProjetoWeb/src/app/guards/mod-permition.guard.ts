import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const modPermitionGuard = () => {
	const authService = inject(AuthService)
	const router = inject(Router)
	let error: any

	if (authService.getCurrentAccess === 'MOD' || authService.getCurrentAccess === 'ADMIN') {
		return true
	}
	router.navigate(['/home'])
	return false
};
