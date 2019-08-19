import { NgModule } from '@angular/core';
import { MaskPhonePipe } from './mask-phone';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [MaskPhonePipe],
  exports: [MaskPhonePipe],
  providers: [
    CurrencyPipe,
    DecimalPipe
],
})
export class PipesModule {}