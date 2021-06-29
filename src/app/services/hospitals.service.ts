import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

export interface GetHospitals {
  ok: boolean;
  hospitals: Hospital[];
  total: number;
}

export interface CreateHospital {
  ok: boolean;
  hospital: Hospital;
}

const base_url = environment.base_api_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  getHospitals(from: number = 0) {
    return this.http
      .get<GetHospitals>(`${base_url}/hospitals?from=${from}`, {
        ...this.headers,
      })
      .pipe(
        map((response: GetHospitals) => ({
          hospitals: response.hospitals,
          total: response.total,
          ok: response.ok,
        }))
      );
  }

  createHospital(name: string): Observable<CreateHospital> {
    return this.http.post<CreateHospital>(
      `${base_url}/hospitals`,
      { name },
      {
        ...this.headers,
      }
    );
  }

  updateHospital(_id: string, name: string) {
    return this.http.put(
      `${base_url}/hospitals/${_id}`,
      { name },
      {
        ...this.headers,
      }
    );
  }

  deleteHospital(_id: string) {
    return this.http.delete(`${base_url}/hospitals/${_id}`, {
      ...this.headers,
    });
  }
}
