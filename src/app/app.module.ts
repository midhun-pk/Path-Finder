import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GridComponent } from './grid/grid.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { NodeListnersDirective } from './directives/node-listners.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GridComponent,
    VisualizerComponent,
    NodeListnersDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
