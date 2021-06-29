import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Doctor } from 'src/app/models/doctor.model';
import {
  CreateDoctor,
  DoctorService,
  GetDoctors,
} from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService, SearchResult } from 'src/app/services/searchs.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public doctors: Doctor[] = [];
  public total: number = 0;
  public loading: boolean = true;
  public from: number = 0;
  public incPage: number = 5;
  public imageSubscription!: Subscription;

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchsService: SearchsService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.imageSubscription = this.modalImageService.newImage
      .pipe(delay(200))
      .subscribe((img) => this.getDoctors());
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  getDoctors() {
    this.loading = true;
    this.doctorService
      .getDoctors(this.from)
      .subscribe((response: GetDoctors) => {
        this.loading = false;

        this.total = response.total;
        this.doctors = response.doctors;
      });
  }

  deleteDoctor(Doctor: Doctor) {
    Swal.fire({
      title: 'Delete Doctor?',
      text: `Do you want to delete doctor ${Doctor.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(Doctor._id).subscribe(() => {
          this.getDoctors();
          Swal.fire(
            'Doctor deleted',
            `${Doctor.name} user has been deleted.`,
            'success'
          );
        });
      }
    });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.total) {
      this.from -= value;
    }

    const searchValue = (
      document.getElementById('inputSearch') as HTMLInputElement
    ).value;

    if (searchValue) {
      this.search(searchValue);
    } else {
      this.getDoctors();
    }
  }

  openModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id || '', doctor.img);
  }

  search(criteria: string) {
    if (!criteria) {
      this.getDoctors();
    } else {
      const query = `criteria=${criteria}&from=${this.from}`;
      this.searchsService
        .search('doctors', query)
        .subscribe((response: SearchResult) => {
          this.doctors = response.results as Doctor[];
          this.total = response.total;
          if (this.total === 0) {
            this.from = 0;
          }
        });
    }
  }
}
