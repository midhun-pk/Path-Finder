import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizerComponent } from './components/visualizer/visualizer.component';


const routes: Routes = [
  { path: 'visualize', component: VisualizerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
