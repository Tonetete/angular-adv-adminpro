import { environment } from 'src/environments/environment';
import { Hospital } from './hospital.model';

const base_url = environment.base_api_url;

interface _DoctorUser {
  _id: string;
  name: string;
  img?: string;
}

export class Doctor {
  constructor(
    public _id: string,
    public name: string,
    public img?: string,
    public user?: _DoctorUser,
    public hospital?: Hospital
  ) {}
}
