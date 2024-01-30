import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Access } from '../../access';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrl: './user-form.component.css'
})
export class UserFormComponent {

	userId: number = Number.parseInt(this.router.url.slice(6))
	formGroup: FormGroup = <FormGroup>{}
	submitted = false
	userHasPermition = false
	error: any;

	constructor(private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
		if (authService.getCurrentAccess === "ADMIN") {
			this.userHasPermition = true
		}
		this.initFormUser()
	}

	initFormUser() {
		if(this.userId) {
			this.userService.getUserById(this.userId).subscribe(user => {

				this.formGroup = this.formBuilder.group({
					id: [user.id],
					name: [user.name, [Validators.required]],
					email: [user.email, [Validators.required, this.emailValidator]],
					password: [user.password, [Validators.required, Validators.minLength(8), this.passwordValidator]],
					cpf: [user.cpf, [Validators.required]],
					access: [user.access]
				})
			}, (err) => {
				this.error = `Erro ao mostrar usuario. StackTrace: ${err}`
			})
		}
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

	submit() {
		this.submitted = true

		if (this.formGroup.invalid) {
			return
		}

		this.userService.updateUser(this.userId, this.formGroup.value).subscribe(() => {
			this.router.navigate(['/userManagement'])
		}, (err) => {
			this.error = `Erro ao atualizar usuario. StackTrace: ${err}`
		})
	}

	delete() {
		this.userService.deleteUser(this.userId).subscribe(() => {
			this.router.navigate(['/userManagement'])
		}, (err) => {
			this.error = `Erro ao deletar usuario. StackTrace: ${err}`
		})
	}
}
