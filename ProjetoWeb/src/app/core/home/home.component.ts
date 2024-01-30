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
	userHasPermitionResult = false
	error: any;

	constructor(private authService: AuthService, private userService: UserService, private productService: ProductService) {
		this.loggedUserName = authService.getCurrentName
		
		this.userHasPermition().subscribe(result => {
			this.userHasPermitionResult = result
			if (result) {
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
		let result = new Subject<boolean>()

		this.userService.getCurrentUser().subscribe(user => {
			result.next(user.access === Access.mod || user.access === Access.admin)
		}, (err) => {
			this.error = `Erro ao carregar usuario. StackTrace: ${err}`
			result.next(false)
		})
		return result.asObservable()
	}
}
