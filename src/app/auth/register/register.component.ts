import Swal from 'sweetalert2';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private registerSubscription!: Subscription;
  public formSubmitted = false;
  public registerForm = this.formBuidler.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.required],
    },
    {
      validators: this.validationService.passwordsValidator(
        'password',
        'confirmPassword'
      ),
    }
  );

  constructor(
    private formBuidler: FormBuilder,
    private userService: UserService,
    private router: Router,
    public validationService: ValidationService
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.registerSubscription = this.userService
      .createUser(this.registerForm.value)
      .subscribe(
        (response) => {
          this.router.navigateByUrl('/');
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }
}
