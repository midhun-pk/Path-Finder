import { Component, OnInit } from '@angular/core';
import { PathFinderService } from 'src/app/services/path-finder.service';
import { GridAnimationService } from 'src/app/services/grid-animation.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Algorithm } from 'src/app/models/algorithm.model';
import { GridService } from 'src/app/services/grid.service';
import { Grid } from 'src/app/models/grid.model';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {
  algorithm: Algorithm;
  grid: Grid;

  constructor(
    private pathFinderService: PathFinderService,
    private gridAnimationService: GridAnimationService,
    private sidebarService: SidebarService,
    private gridService: GridService
  ) { }

  ngOnInit() {
    this.pathFinderService.getAlgorithm().subscribe(algorithm => this.algorithm = algorithm);
    this.gridService.getGrid().subscribe(grid => this.grid = grid);
  }

  onClearWalls() {
    this.gridService.clearWalls();
  }

  onVisualize() {
    if (this.algorithm) {
      const success = this.pathFinderService.runAlgorithm(this.grid);
      this.gridAnimationService.animateAlgorithm();
    }
  }

  onSettingsButtonClick() {
    this.sidebarService.showSideBar();
  }
}
