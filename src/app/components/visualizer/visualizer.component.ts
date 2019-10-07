import { Component, OnInit } from '@angular/core';
import { PathFinderService } from 'src/app/services/path-finder.service';
import { GridAnimationService } from 'src/app/services/grid-animation.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  constructor(
    private pathFinderService: PathFinderService,
    private gridAnimationService: GridAnimationService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
  }

  onClearWalls() {
    this.pathFinderService.clearWalls();
  }

  onVisualize() {
    this.pathFinderService.runAlgorithm();
    this.gridAnimationService.animateAlgorithm();
  }

  onSettingsButtonClick() {
    this.sidebarService.showSideBar();
  }
}
