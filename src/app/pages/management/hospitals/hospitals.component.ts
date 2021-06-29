import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { SearchResult, SearchsService } from 'src/app/services/searchs.service';

import {
  CreateHospital,
  HospitalsService,
} from 'src/app/services/hospitals.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public total: number = 0;
  public loading: boolean = true;
  public from: number = 0;
  public incPage: number = 5;
  public imageSubscription!: Subscription;

  constructor(
    private hospitalService: HospitalsService,
    private modalImageService: ModalImageService,
    private searchsService: SearchsService
  ) {}

  ngOnInit(): void {
    this.getHospitals();

    this.imageSubscription = this.modalImageService.newImage
      .pipe(delay(200))
      .subscribe((img) => this.getHospitals());
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe;
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService
      .getHospitals(this.from)
      .subscribe(({ ok, hospitals, total }) => {
        this.loading = false;
        this.hospitals = hospitals;
        this.total = total;
      });
  }

  createHospital(name: string) {
    this.hospitalService
      .createHospital(name)
      .subscribe((response: CreateHospital) => {
        this.hospitals.push(response.hospital);
      });
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id, hospital.name)
      .subscribe(() =>
        Swal.fire('Changes saved', 'Hospital edited succesfully', 'success')
      );
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Delete hospital?',
      text: `Do you want to delete ${hospital.name} hospital?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital._id).subscribe(() => {
          this.getHospitals();
          Swal.fire(
            'Hospital deleted',
            `${hospital.name} user has been deleted.`,
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
      this.getHospitals();
    }
  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create Hospital',
      input: 'text',
      inputLabel: 'Name',
      inputPlaceholder: "Hospital's name",
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this.createHospital(value);
    }
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal(
      'hospitals',
      hospital._id || '',
      hospital.img
    );
  }

  search(criteria: string) {
    if (!criteria) {
      this.getHospitals();
    } else {
      const query = `criteria=${criteria}&from=${this.from}`;
      this.searchsService
        .search('hospitals', query)
        .subscribe((response: SearchResult) => {
          this.hospitals = response.results as Hospital[];
          this.total = response.total;
          if (this.total === 0) {
            this.from = 0;
          }
        });
    }
  }
}
