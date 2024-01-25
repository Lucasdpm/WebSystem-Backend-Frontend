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

	userList: User[] = []
	userId: number = Number.parseInt(this.router.url.slice(6))
	formGroup: FormGroup = <FormGroup>{}
	currentEmail: String = ''
	currentCpf: String = ''
	submitted = false
	error: any;

	constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
		this.userService.getUserById(this.userId).subscribe(user => {
			this.formGroup = this.formBuilder.group({
				id: [user.id],
				name: [user.name],
				email: [user.email, [this.emailValidator]],
				password: [user.password],
				cpf: [user.cpf],
				access: [user.access]
			})
			this.formGroup.addValidators(Validators.required)
		})

		this.userService.getAllUsers().subscribe(data => { // matar
			this.userList = data
		})

		this.initFormUserDetails()
	}

	initFormUserDetails() {
		this.userService.getUserById(this.userId).subscribe(user => {

			this.currentEmail = user.email // matar
			this.currentCpf = user.cpf // matar

			this.formGroup.patchValue(user); // testar

			this.formGroup = this.formBuilder.group({
				id: [user.id],
				name: [user.name, [Validators.required]],
				email: [user.email, [Validators.required, this.emailValidator]],
				password: [user.password],
				cpf: [user.cpf, [Validators.required]],
				access: [user.access]
			})
		})
	}

	get userPermition2() {
		return this.userService.checkAccess() === Access.mod
	}

	userPermition(): boolean { //mudar para o de cima
		return false
	}

	emailValidator(control: AbstractControl) {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		const email = control.value

		const valid = emailRegex.test(email)
		return valid ? null : { emailValidator: true }
	}

	emailCheck(): boolean { // matar
		let alreadyRegistered: boolean = false

		this.userList.forEach(user => { // tem que vim do backend 
			if (user.email === this.formGroup.value.email) {
				if (this.currentEmail !== this.formGroup.value.email) {
					alreadyRegistered = true
				}
			}
		})

		return alreadyRegistered
	}

	cpfCheck(): boolean { // matar
		var alreadyRegistered: boolean = false
		this.userList.forEach(user => {
			if (user.cpf === this.formGroup.value.cpf) {
				if (this.currentCpf !== this.formGroup.value.cpf) {
					alreadyRegistered = true
				}
			}
		})
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
