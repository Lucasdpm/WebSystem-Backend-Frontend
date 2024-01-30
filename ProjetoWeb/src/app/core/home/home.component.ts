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
	userHasPermition = false
	error: any;

	constructor(private authService: AuthService, private userService: UserService, private productService: ProductService) {
		this.loggedUserName = authService.getCurrentName

		if (authService.getCurrentAccess === 'MOD' || authService.getCurrentAccess === 'ADMIN') {
			this.userHasPermition = true
			this.userService.getAllUsers().subscribe(data => {
				this.userList = data
				this.numUsers = this.userList.length
			})
		}

		this.productService.getAllProducts().subscribe(data => {
			this.productList = data
			this.numProducts = this.productList.length
		})
	}
}
