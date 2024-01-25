import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { NgxMaskDirective, provideNgxMask , NgxMaskPipe} from 'ngx-mask';

import { UserService } from '../user.service';
import { LoginComponent } from '../User/login/login.component';
import { RegisterComponent } from '../User/register/register.component';
import { UserManagementComponent } from '../User/user-management/user-management.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRoutingModule } from './user-routing.module';
import { UserAccessNamePipe } from '../user-access-name.pipe';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    UserFormComponent,
    UserAccessNamePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    UserRoutingModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [
    UserService,
    provideNgxMask(),
    provideClientHydration()
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    UserFormComponent,
    UserRoutingModule
  ]
})
export class UserModule { }
