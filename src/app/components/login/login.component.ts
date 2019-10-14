/**
 * Created By : Milind Ahuja 
 */

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../services/config/config.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, ValidationService.emailValidator]],
			password: ['', [Validators.required, ValidationService.passwordValidator]]
		});
	}

	// Check if user already logged in
	ngOnInit() {
		if (localStorage.getItem('userData')) {
			this.router.navigate(['/']);
		}
	}

	// Initiate login
	doLogin() {
		this.userService.doLogin({users: this.loginForm.value}).subscribe(
			(response)=>{ 
			this.success(response);
		});
	}

	// Login success function
	success(data) {
		if (!data.error) {
			localStorage.setItem('userData', JSON.stringify(data));
			this.router.navigate(['/']);
			this.toastr.success('Success', data.message);
		} else {
			this.toastr.error('Failed', data.message);
		}
	}

}

/**
 * Created By : Milind Ahuja 
 */
