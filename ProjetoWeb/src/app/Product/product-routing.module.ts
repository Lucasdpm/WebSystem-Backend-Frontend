import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from '../guards/is-logged-in.guard';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [
    { path: 'productManagement', component: ProductManagementComponent, canActivate: [isLoggedInGuard]},
    { path: 'product/:id', component: ProductFormComponent, canActivate: [isLoggedInGuard]},
    { path: 'product', component: ProductFormComponent, canActivate: [isLoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
