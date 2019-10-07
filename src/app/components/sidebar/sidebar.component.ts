import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  active: boolean;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  onCloseSideBarClick() {
    this.active = false;
    this.sidebarService.hideSideBar();
  }

  onMenuClick() {
    this.active = true;
  }

}
