import { NgModule } from '@angular/core';
import { MaskPhonePipe } from './mask-phone';

@NgModule({
  declarations: [MaskPhonePipe],
  exports: [MaskPhonePipe]
})
export class PipesModule {}