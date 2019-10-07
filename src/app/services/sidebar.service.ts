import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  open = new BehaviorSubject<boolean>(false);

  constructor() { }

  getState() {
    return this.open;
  }

  showSideBar() {
    this.open.next(true);
  }

  hideSideBar() {
    this.open.next(false);
  }
}
