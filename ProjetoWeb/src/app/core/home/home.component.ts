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
		this.userHasPermitionResult = Boolean(this.userHasPermition())
		this.loggedUserName = authService.getCurrentName

		if (this.userHasPermitionResult) {
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

	userHasPermition() {
		this.userService.getCurrentUser().subscribe(user => {

			console.log(`Teste 1 :   ${user.id}`)
			console.log(`Teste 2 :   ${user.name}`)
			console.log(`Teste 3 :   ${user.email}`)
			console.log(`Teste 2 :   ${user.password}`)


			this.userHasPermitionResult = user.access === Access.mod || user.access === Access.admin
			return this.userHasPermitionResult
		}, (err) => {
			this.error = `Erro ao carregar usuario. StackTrace: ${err}`
			return this.userHasPermitionResult
		})
	}
}
