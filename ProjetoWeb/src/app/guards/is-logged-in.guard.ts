import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from '../auth.service';

export const isLoggedInGuard = () => {
  const auth = inject(AuthService)
  const router = inject(Router)
  
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
