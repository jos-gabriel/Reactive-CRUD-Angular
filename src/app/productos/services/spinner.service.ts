import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private showSpinnerSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  show() {
    this.showSpinnerSubject.next(true);
  }

  hide() {
    this.showSpinnerSubject.next(false);
  }

  getSpinnerVisibility() {
    return this.showSpinnerSubject.asObservable();
  }
}
