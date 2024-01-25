import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { filter, map } from 'rxjs';

export const isLoggedInGuard = () => {
  const userService = inject(UserService)
  const router = inject(Router)
  
  // userService.user.pipe(
  //   filter((user) => user != undefined),
  //   map((user) => {
  //     if(!user) {
  //       router.navigateByUrl('/')
  //       return false
  //     }
  //     return true
  //   })
  // )
};
