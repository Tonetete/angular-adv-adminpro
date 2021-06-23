import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  constructor() {}

  ngOnInit(): void {
    // this.subscription = this.getObservable()
    //   .pipe(retry())
    //   .subscribe(
    //     (value) => console.log(`Subs: ${value}`),
    //     (error) => console.warn(error),
    //     () => console.log('Completed')
    //   );
    this.subscription = this.getIntervalObservable().subscribe((value) =>
      console.log(value)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getIntervalObservable = (): Observable<any> => {
    const interval$ = interval(500).pipe(
      take(10),
      map((value) => value + 1),
      filter((value) => value % 2 === 0)
    );
    return interval$;
  };

  getObservable = (): Observable<number> => {
    let i = -1;
    return new Observable((observer) => {
      setInterval(() => {
        i++;
        observer.next(i);
        if (i == 4) {
          clearInterval();
          observer.complete();
        }
        if (i == 2) {
          observer.error('There was an error at the count of 2');
        }
      }, 1000);
    });
  };
}
