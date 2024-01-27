import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Access } from '../access';
import { AuthHttpService } from '../auth-http.service';

export const modPermitionGuard = () => {
  const authService = inject(AuthHttpService)
  const router = inject(Router)

  // const userAccess = userService.user.value.access
  // if(userAccess === Access.mod || userAccess === Access.admin) return true

  // router.navigateByUrl('/home')
  // return false
};
