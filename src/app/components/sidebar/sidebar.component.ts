import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menus = [{
    name: 'Algorithms',
    value: 'algorithm',
    subMenus: [{
      name: 'Breadth First Search',
      value: 'bfs',
    }, {
      name: 'Depth First Search',
      value: 'dfs',
    }, {
      name: 'Dijikstra\'s',
      value: 'dijikstra',
    }, {
      name: 'A* Search',
      value: 'astar',
    }]
  }, {
    name: 'Mazes',
    value: 'maze',
    subMenus: []
  }];
  selectedMenu = {};
  selectedSubMenu = {};
  subMenus = [];

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  onCloseSideBarClick() {
    this.sidebarService.hideSideBar();
    this.selectedMenu = {};
  }

  onMenuClick(menu) {
    this.selectedMenu = menu;
  }

  onSubMenuClick(menu) {
    this.selectedSubMenu = menu;
  }

}
