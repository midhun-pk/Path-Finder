import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  open: boolean;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.getState().subscribe(state => this.open = state);
  }

}
