import { NgModule } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from './services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ProductsComponent, ProductComponent],
  imports: [ProductsRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [ProductService],
})
export class ProductsModule {}
