import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/config/config.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }

  ngOnInit() {
  }

  // Initiate Registration
  doRegistration() {
    console.log('caled');
    this.userService.doRegister({ users: this.registerForm.value }).subscribe(
      (response) => {
        this.success(response);
      },
      (error) => {
        this.error(error);
      });
  }

  // Registration success function
  success(data) {
      this.router.navigate(['/login']);
      this.toastr.success('Registered Successfully!', 'Please Login now.');
  }

  // Registration error function
  error(data) {
      this.toastr.error('Failed', data.error);
  }

}
