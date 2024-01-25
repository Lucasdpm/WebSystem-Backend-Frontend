import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Access } from '../../access';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent {

	//userList: User[] = []
	formGroup: FormGroup
	submitted = false

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private router: Router) 
	{
		this.formGroup = formBuilder.group({
			name: [null, [Validators.required]],
			email: [null, [Validators.required, this.emailValidator]],
			password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
			cpf: [null, [Validators.required]],
			access: <Access>Access.user
		})

		// this.userService.getAllUsers().subscribe(data => {
		// 	this.userList = data
		// })
	}

	emailValidator(control: AbstractControl) {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		const email = control.value

		const valid = emailRegex.test(email)
		return valid ? null : { emailValidator: true }
	}

	passwordValidator(control: AbstractControl) {
		const password = control.value

		let hasLetter = /[a-zA-Z]/.test(password)
		let hasNumber = /\d/.test(password)
		let hasNonalphas = /[!@#$%*,.;:/?-_]/.test(password)

		const valid = hasLetter && hasNumber && hasNonalphas && password.length || !password.length
		return valid ? null : { passwordValidator: true }
	}

	cpfCheck(): boolean {
		// var alreadyRegistered: boolean = false
		// this.userList.forEach(user => {
		// 	if (user.cpf === this.formGroup.value.cpf) {
		// 		alreadyRegistered = true
		// 	}
		// })
		// return alreadyRegistered
		return false
	}

	emailCheck(): boolean {
		// let alreadyRegistered: boolean = false
		// this.userList.forEach(user => {
		// 	if (user.email === this.formGroup.value.email) {
		// 		alreadyRegistered = true
		// 	}
		// })
		// return alreadyRegistered
		return false
	}

	registerUser() {
		this.submitted = true;

		if (this.formGroup.invalid) {
			return
		}
		if (this.cpfCheck() || this.emailCheck()) {
			return
		}

		this.authService.register(this.formGroup.value).subscribe(() => {
			this.router.navigate(['/login'])
		})
	}

}