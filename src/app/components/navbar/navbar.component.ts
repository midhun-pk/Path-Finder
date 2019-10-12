import { Component, OnInit } from '@angular/core';
import { PathFinderService } from 'src/app/services/path-finder.service';
import { Algorithm } from 'src/app/models/algorithm.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { GridService } from 'src/app/services/grid.service';
import { GridAnimationService } from 'src/app/services/grid-animation.service';
import { Grid } from 'src/app/models/grid.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  grid: Grid;
  algorithm: Algorithm;

  constructor(
    private pathFinderService: PathFinderService,
    private sidebarService: SidebarService,
    private gridAnimationService: GridAnimationService,
    private gridService: GridService
  ) { }

  ngOnInit() {
    this.pathFinderService.getAlgorithm().subscribe(algorithm => this.algorithm = algorithm);
    this.gridService.getGrid().subscribe(grid => this.grid = grid);
  }

  onSelectAlgorithmClick() {
    this.sidebarService.showSideBar();
  }

  onVisualizeClick() {
    if (this.algorithm) {
      const success = this.pathFinderService.runAlgorithm(this.grid);
      this.gridAnimationService.animateAlgorithm(this.grid);
    }
  }

  onResetGridClick() {
    this.gridService.reset();
  }

  onClearAnimationClick() {
    this.gridAnimationService.clearAnimation();
  }

  onClearWallsClick() {
    this.gridService.clearWalls();
  }

}
