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
  isAnimating: boolean;

  constructor(
    private pathFinderService: PathFinderService,
    private sidebarService: SidebarService,
    private gridAnimationService: GridAnimationService,
    private gridService: GridService
  ) { }

  ngOnInit() {
    this.pathFinderService.getAlgorithm().subscribe(algorithm => this.algorithm = algorithm);
    this.gridService.getGrid().subscribe(grid => this.grid = grid);
    this.gridAnimationService.isCurrentlyAnimating().subscribe(isAnimating => this.isAnimating = isAnimating);
  }

  onSelectAlgorithmClick() {
    this.sidebarService.showSideBar();
  }

  onVisualizeClick() {
    if (this.algorithm) {
      this.gridAnimationService.clearAnimation(this.grid);
      this.pathFinderService.runPathFinderAlgorithm();
    }
  }

  onResetGridClick() {
    this.gridService.reset();
  }

  onClearAnimationClick() {
    this.gridAnimationService.clearAnimation(this.grid);
  }

  onClearWallsClick() {
    this.gridService.clearWalls();
  }

  isVisualizeButtonActive(): boolean {
    return this.algorithm && !this.isAnimating;
  }

  isResetGridButtonActive(): boolean {
    return !this.isAnimating;
  }

  isClearAnimationButtonActive(): boolean {
    return !this.isAnimating;
  }

  isResetWallsButtonActive(): boolean {
    return !this.isAnimating;
  }
}
