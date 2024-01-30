import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Access } from '../../access';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent {

	formGroup: FormGroup
	submitted = false
	emailIsInvalid = false
	cpfIsInvalid = false

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private router: Router) {
		this.formGroup = formBuilder.group({
			name: [null, [Validators.required]],
			email: [null, [Validators.required, this.emailValidator]],
			password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
			cpf: [null, [Validators.required]],
			access: <Access>Access.user
		})
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

	registerUser() {
		this.submitted = true;

		if (this.formGroup.invalid) {
			return
		}

		this.authService.postRegister(
			this.formGroup.value.name,
			this.formGroup.value.email,
			this.formGroup.value.cpf,
			this.formGroup.value.password)
			.subscribe(() => {
				this.router.navigate(['/login'])
			}, (err) => {
				if (err.error == "E-mail em uso.") {
					this.emailIsInvalid = true
				}
				if (err.error == "Cpf em uso.") {
					this.cpfIsInvalid = true
				}
		})
	}

}