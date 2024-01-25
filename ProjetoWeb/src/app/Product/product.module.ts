import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { ProductManagementComponent } from '../Product/product-management/product-management.component';
import { ProductFormComponent } from './product-form/product-form.component';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ProductRoutingModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CurrencyMaskModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
        provide:  DEFAULT_CURRENCY_CODE,
        useValue: 'BRL'
    }
  ],
  exports: [
    ProductManagementComponent,
    ProductFormComponent
  ]
})
export class ProductModule { }
