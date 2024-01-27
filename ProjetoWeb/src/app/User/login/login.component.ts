import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';
import { User } from '../../user';

import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../../models/login';
import { JwtAuth } from '../../models/jwtAuth';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {

	formGroup: FormGroup

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

		if (!this.userService.checkLogIn()) {
			return
		}
	}

	login() {

        if (this.formGroup.invalid) {
            return;
        }

        this.authService.postLogin(this.formGroup.value.email, this.formGroup.value.password).subscribe(() => {
            this.router.navigate(['/home']);
        });
    }
}

