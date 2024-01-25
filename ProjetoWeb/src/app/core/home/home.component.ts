import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { Access } from '../../access';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  userList: User[] = []
  numUsers: number = 0
  loggedUserName: string = ''
  
  productList: Product[] = []
  numProducts: number = 0

  constructor(private userService: UserService, private productService: ProductService) {
    if (!this.userService.checkLogIn()) {
      return
    }
    
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
      this.numUsers = this.userList.length
      //this.userService.user.subscribe((value: User) => this.loggedUserName = value.name)
    })

    this.productService.getAllProducts().subscribe(data => {
      this.productList = data
      this.numProducts = this.productList.length
    })
  }

  userPermition(): boolean {
    // if (this.userService.checkAccess() === Access.user) {
    //   return false
    // }
    return true
  }
}
