import { Component } from '@angular/core';
import { UserService } from '../../../user.service';
import { User } from '../../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  logedUserName: string = ''

  constructor(private userService: UserService, private router: Router) {
    // this.userService.user.subscribe((value: User) => {
    //   if (value === null) return
    //   this.logedUserName = value.name
    // })
  }

  logOff() {
    this.userService.signOut()
    this.router.navigate(['/login'])
  }
}
