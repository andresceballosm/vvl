import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoadService {
  loading$: Observable<boolean> = Observable.of(false);
  constructor() { }

  fireLoader() {
    this.loading$ = Observable.of(true);
  }
  
  stopLoader() {
    this.loading$ = Observable.of(false);
  }
}
