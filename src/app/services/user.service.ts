import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

declare const gapi: any;

const base_url = environment.base_api_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '960120761642-218vjnr1hicvo15tludmschtfsq3jh9c.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(true);
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        map((response: any) => {
          const { name, role, google, email, img = '', uid } = response.user;
          this.user = new User(name, email, '', img, google, role, uid);
          localStorage.setItem('token', response.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  updateUser(data: { email: string; name: string }) {
    return this.http.put(
      `${base_url}/users/${this.user.uid}`,
      { ...data, role: this.user.role },
      {
        headers: { 'x-token': this.getToken() },
      }
    );
  }

  loginUser(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  loginGoogleUser(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }
}
