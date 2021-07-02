import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService, UpdatedDoctor } from 'src/app/services/doctor.service';
import { HospitalsService } from 'src/app/services/hospitals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  public doctorForm!: FormGroup;
  public hospitals!: Hospital[];
  public selectedHospital!: Hospital | undefined;
  public selectedDoctor!: Doctor | undefined;

  constructor(
    private formBuild: FormBuilder,
    private doctorService: DoctorService,
    private hospitalService: HospitalsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.getDoctor(id);
    });

    this.getHospitals();
    this.doctorForm = this.formBuild.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.doctorForm.get('hospital')?.valueChanges.subscribe((id) => {
      this.selectedHospital =
        this.hospitals?.find((h) => h._id === id) || undefined;
    });
  }

  getDoctor(id: string) {
    if (id === 'new') {
      return;
    }

    this.doctorService
      .getDoctorById(id)
      .pipe(delay(150))
      // @ts-ignore
      .subscribe((doctor) => {
        if (!doctor) {
          return this.router.navigateByUrl(`/dashboard/doctors`);
        }

        const { name, hospital } = doctor;

        this.selectedDoctor = doctor;
        this.doctorForm.setValue({ name, hospital: hospital?._id });
      });
  }

  getHospitals() {
    this.hospitalService
      .getHospitals()
      .subscribe(({ hospitals }: { hospitals: Hospital[] }) => {
        this.hospitals = hospitals;
      });
  }

  saveDoctor() {
    if (this.selectedDoctor) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id,
      };
      this.doctorService
        .updateDoctor(data)
        .subscribe(({ doctor }: UpdatedDoctor) => {
          Swal.fire(
            'Doctor updated',
            `${doctor.name} updated successfully`,
            'success'
          );
        });
    } else {
      const { name } = this.doctorForm.value;
      this.doctorService
        .createDoctor(this.doctorForm.value)
        .subscribe((response) => {
          Swal.fire(
            'Doctor created',
            `${name} created successfully`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/doctor/${response.doctor._id}`);
        });
    }
  }
}
