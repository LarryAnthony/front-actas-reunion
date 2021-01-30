import { NgModule } from '@angular/core';
import { FechaPipe } from './fecha.pipe';



@NgModule({
  declarations: [FechaPipe],
  exports: [FechaPipe]
})
export class PipesModule { }
