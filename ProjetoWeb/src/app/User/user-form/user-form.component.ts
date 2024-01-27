import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Access } from '../../access';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrl: './user-form.component.css'
})
export class UserFormComponent {

	userId: number = Number.parseInt(this.router.url.slice(6))
	formGroup: FormGroup = <FormGroup>{}
	submitted = false
	error: any;

	constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
		this.initFormUser()
	}

	initFormUser() {
		if(this.userId) {
			this.userService.getUserById(this.userId).subscribe(user => {

				this.formGroup = this.formBuilder.group({
					id: [user.id],
					name: [user.name, [Validators.required]],
					email: [user.email, [Validators.required, this.emailValidator]],
					password: [user.password],
					cpf: [user.cpf, [Validators.required]],
					access: [user.access]
				})
			}, (err) => {
				this.error = `Erro ao mostrar usuario. StackTrace: ${err}`
			})
		}
	}

	get userPermition() {
		return this.userService.checkAccess() === Access.mod
	}

	emailValidator(control: AbstractControl) {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		const email = control.value

		const valid = emailRegex.test(email)
		return valid ? null : { emailValidator: true }
	}

	emailCheck(): boolean { // matar
		let alreadyRegistered: boolean = false

		

		return alreadyRegistered
	}

	cpfCheck(): boolean { // matar
		var alreadyRegistered: boolean = false

		return alreadyRegistered
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
