import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ActivationEnd,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public subscription: Subscription | undefined;
  public title!: string;
  constructor(private router: Router, private routeActivated: ActivatedRoute) {
    this.subscription = this.getRouterData().subscribe(
      ({ title = 'Blank Page' }) => {
        this.title = title;
        document.title = `AdminPro - ${title}`;
      }
    );
    // this.subscription = this.getRouteActivatedData()?.subscribe(
    //   ({ title = 'Blank Page' }) => {
    //     this.title = title;
    //   }
    // );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.subscription?.unsubscribe();
  }

  getRouteActivatedData() {
    return this.routeActivated.firstChild?.data;
  }
  getRouterData() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
