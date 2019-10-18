import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { PathFinderService } from 'src/app/services/path-finder.service';
import { Menu, SubMenu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menus: Menu[] = [];
  selectedMenu: Menu;
  selectedSubMenu: SubMenu;

  constructor(
    private sidebarService: SidebarService,
    private pathFinderService: PathFinderService
  ) { }

  ngOnInit() {
    const algorithms = new Menu();
    algorithms.name = 'Path Finding Algorithms';
    algorithms.value = 'algorithm';
    algorithms.subMenus.push({ name: 'Breadth First Search', alias: 'BFS', value: 'bfs' });
    algorithms.subMenus.push({ name: 'Depth First Search', alias: 'DFS', value: 'dfs' });
    algorithms.subMenus.push({ name: 'Dijikstra\'s', alias: 'Dijikstra\'s', value: 'dijikstra' });
    algorithms.subMenus.push({ name: 'A* Search', alias: 'A* Searc', value: 'astar' });
    const mazes = new Menu();
    mazes.name = 'Maze Algorithms';
    mazes.value = 'maze';
    mazes.subMenus.push({ name: 'Recursive Backtracking', alias: 'RB', value: 'rb' });
    this.menus.push(algorithms);
    this.menus.push(mazes);
  }

  onCloseSideBarClick() {
    this.sidebarService.hideSideBar();
    this.selectedMenu = null;
    this.selectedSubMenu = null;
  }

  onMenuClick(menu: Menu) {
    this.selectedMenu = menu;
  }

  onSubMenuClick(menu: { name: string, alias: string, value: string }) {
    this.selectedSubMenu = menu;
    if (this.selectedMenu.value === 'algorithm') {
      this.pathFinderService.setAlgorithm(this.selectedSubMenu);
    }
    if (this.selectedMenu.value === 'maze') {
      this.pathFinderService.runMazeGenerationAlgorithm(this.selectedSubMenu.value);
    }
    this.onCloseSideBarClick();
  }

}
