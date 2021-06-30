import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Role, User } from '../models/user.model';
import { LoadUsers } from '../interfaces/load-users.interface';

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
    localStorage.removeItem('menu');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): Role {
    return this.user.role || 'USER_ROLE';
  }

  saveLocalStorage({ token, menu }: { token: string; menu: any[] }) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        ...this.headers,
      })
      .pipe(
        map((response: any) => {
          const { name, role, google, email, img = '', uid } = response.user;
          this.user = new User(name, email, '', img, google, role, uid);
          this.saveLocalStorage({ token: response.token, menu: response.menu });
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((response: any) => {
        this.saveLocalStorage({ ...response });
      })
    );
  }

  updateProfile(data: { email: string; name: string }) {
    return this.http.put(
      `${base_url}/users/${this.user.uid}`,
      { ...data, role: this.user.role },
      {
        ...this.headers,
      }
    );
  }

  updateUser(data: User) {
    return this.http.put(
      `${base_url}/users/${this.user.uid}`,
      { ...data },
      {
        ...this.headers,
      }
    );
  }

  loginUser(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((response: any) => {
        this.saveLocalStorage({ ...response });
      })
    );
  }

  loginGoogleUser(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((response: any) => {
        this.saveLocalStorage({ ...response });
      })
    );
  }

  getUsers(from: number = 0) {
    return this.http
      .get<LoadUsers>(`${base_url}/users?from=${from}`, {
        ...this.headers,
      })
      .pipe(
        map((response: any) => ({
          total: response.total,
          users: this.transformUsers(response.users),
        }))
      );
  }

  deleteUser(user: User) {
    return this.http.delete(`${base_url}/users/${user.uid}`, {
      ...this.headers,
    });
  }

  transformUsers(results: any[]): User[] {
    return results.map((user) => {
      const { name, role, google, email, img = '', uid } = user;
      return new User(name, email, '', img, google, role, uid);
    });
  }
}
