import { Component, OnInit } from '@angular/core';
import { PathFinderService } from 'src/app/services/path-finder.service';
import { Algorithm } from 'src/app/models/algorithm.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  algorithm: Algorithm;

  constructor(private pathFinderService: PathFinderService) { }

  ngOnInit() {
    this.pathFinderService.getAlgorithm().subscribe(algorithm => this.algorithm = algorithm);
  }

}
