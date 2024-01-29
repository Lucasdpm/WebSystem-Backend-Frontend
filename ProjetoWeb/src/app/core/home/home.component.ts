import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { Access } from '../../access';
import { AuthService } from '../../auth.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  userList: User[] = []
  numUsers: number = 0
  
  productList: Product[] = []
  numProducts: number = 0
  
  loggedUserName: string = ''
  error: any;

  constructor(private authService: AuthService, private userService: UserService, private productService: ProductService) {

    this.loggedUserName = authService.getCurrentName
    
    this.userHasPermition().subscribe(bool => {
      if (bool) {
        this.userService.getAllUsers().subscribe(data => {
          this.userList = data
          this.numUsers = this.userList.length
        })
      }
    })

    this.productService.getAllProducts().subscribe(data => {
      this.productList = data
      this.numProducts = this.productList.length
    })
  }

  userHasPermition(): Observable<boolean> {
    var subject = new Subject<boolean>();
    
    var currentUserId = Number.parseInt(this.authService.getCurrentId)
    this.userService.getUserById(currentUserId).subscribe(user => {
      subject.next(user.access >= Access.mod)
    }, (err) => {
			this.error = `Erro ao carregar usuario. StackTrace: ${err}`
    })
    return subject.asObservable()
  }
}
