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
    document.body.classList.add('blur');
  }

  hideSideBar() {
    this.open.next(false);
    document.body.classList.remove('blur');
  }
}
