import { AppComponent } from './app.component';

import { UserModule } from './User/user.module';
import { ProductModule } from './Product/product.module';
import { CoreModule } from './core/core.module';

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './User/user-routing.module';
import { ProductRoutingModule } from './Product/product-routing.module';
import { CoreRoutingModule } from './core/core-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    UserModule,
    ProductModule,
    CoreModule,
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    AppRoutingModule,
    UserRoutingModule,
    ProductRoutingModule,
    CoreRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
