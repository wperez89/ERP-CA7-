import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorServices } from './token-interceptor.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptorServices,
      multi: true
    }
  ]
})
export class InterceptorModule { }
