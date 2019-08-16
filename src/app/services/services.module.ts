import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from './rest.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [
    RestService,
  ],
})
export class ServicesModule { }