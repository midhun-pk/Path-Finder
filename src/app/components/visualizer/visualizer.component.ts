import { Component, OnInit } from '@angular/core';
import { PathFinderService } from 'src/app/services/path-finder.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  constructor(private pathFinderService: PathFinderService) { }

  ngOnInit() {
  }

  onClearWalls() {
    this.pathFinderService.clearWalls();
  }

  onVisualize() {
    this.pathFinderService.runAlgorithm();
  }
}
