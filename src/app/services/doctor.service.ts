import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

export interface GetDoctors {
  ok: boolean;
  doctors: Doctor[];
  total: number;
}

export interface UpdatedDoctor {
  ok: boolean;
  doctor: Doctor;
}

export interface GetDoctor {
  ok: boolean;
  doctor: Doctor;
}

export interface CreateDoctor {
  ok: boolean;
  doctor: Doctor;
}

const base_url = environment.base_api_url;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  getDoctorById(id: string) {
    return this.http
      .get<GetDoctor>(`${base_url}/doctors/${id}`, {
        ...this.headers,
      })
      .pipe(map(({ ok, doctor }: GetDoctor) => doctor));
  }

  getDoctors(from: number = 0): Observable<GetDoctors> {
    return this.http
      .get<GetDoctors>(`${base_url}/doctors?from=${from}`, {
        ...this.headers,
      })
      .pipe(
        map((response: GetDoctors) => ({
          doctors: response.doctors,
          total: response.total,
          ok: response.ok,
        }))
      );
  }

  createDoctor({
    name,
    hospital,
  }: {
    name: string;
    hospital: string;
  }): Observable<CreateDoctor> {
    return this.http.post<CreateDoctor>(
      `${base_url}/doctors`,
      { name, hospital },
      {
        ...this.headers,
      }
    );
  }

  updateDoctor({
    _id,
    name,
    hospital,
  }: {
    _id: string;
    hospital: string;
    name: string;
  }) {
    return this.http.put<UpdatedDoctor>(
      `${base_url}/doctors/${_id}`,
      { name, hospital },
      {
        ...this.headers,
      }
    );
  }

  deleteDoctor(_id: string) {
    return this.http.delete(`${base_url}/doctors/${_id}`, {
      ...this.headers,
    });
  }
}
