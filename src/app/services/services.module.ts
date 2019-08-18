import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from './rest.service';
import { LoadingService } from './loading.service';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [
    RestService,
    LoadingService,
    InterceptorService,
  ],
})
export class ServicesModule { }