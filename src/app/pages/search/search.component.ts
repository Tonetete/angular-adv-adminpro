import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  public hospitals!: Hospital[];
  public users!: User[];
  public doctors!: Doctor[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ terms }) => {
      this.searchAll(terms);
    });
  }

  searchAll(searchTerms: string) {
    this.searchService
      .searchAll(searchTerms)
      .subscribe(({ hospitals, users, doctors }) => {
        this.users = users;
        this.hospitals = hospitals;
        this.doctors = doctors;
      });
  }
}
