import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ModelType } from '../interfaces/modelType.interface';
import { User } from '../models/user.model';

export interface SearchResult {
  results: User[];
  total: number;
}

const base_url = environment.base_api_url;

@Injectable({
  providedIn: 'root',
})
export class SearchsService {
  public from: number = 0;
  constructor(private http: HttpClient) {}

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  transformUsers(results: any[]): User[] {
    return results.map((user) => {
      const { name, role, google, email, img = '', uid } = user;
      return new User(name, email, '', img, google, role, uid);
    });
  }

  search(type: ModelType, criteria: string = ''): Observable<SearchResult> {
    return this.http
      .get(`${base_url}/search/collection/${type}?${criteria}`, {
        ...this.headers,
      })
      .pipe(
        map((response: any) => {
          switch (type) {
            case 'users':
              return {
                results: this.transformUsers(response.results),
                total: response.total,
              };
            default:
              return { results: [], total: 0 };
          }
        })
      );
  }
}
