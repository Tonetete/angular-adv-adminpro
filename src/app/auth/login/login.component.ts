import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSubscription!: Subscription;
  public auth2: any;
  public loginForm = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  login() {
    this.loginSubscription = this.userService
      .loginUser(this.loginForm.value)
      .subscribe(
        (response) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.initGoogleButton();
  }

  async initGoogleButton() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogleUser(id_token).subscribe((response) => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
      },
      (err: any) => {
        Swal.fire('Error', err, 'error');
      }
    );
  }
}
