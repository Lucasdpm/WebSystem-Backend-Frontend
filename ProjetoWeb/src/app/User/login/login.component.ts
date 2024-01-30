import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {

	formGroup: FormGroup
	submitted = false;

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute) {
		this.formGroup = formBuilder.group({
			email: "",
			password: ""
		})
	}

	login() {
		this.submitted = true
        if (this.formGroup.invalid) {
            return;
        }

        this.authService.postLogin(this.formGroup.value.email, this.formGroup.value.password).subscribe(() => {
            this.router.navigate(['/home']);
        });
    }
}

