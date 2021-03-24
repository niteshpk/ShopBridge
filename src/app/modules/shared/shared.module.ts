import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BootstrapModule } from '../../bootstrap.module';
import { RouterModule } from '@angular/router';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [NavbarComponent, NotFoundComponent, LoadingComponent, EllipsisPipe],
  imports: [
    BootstrapModule,
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  exports:[
    EllipsisPipe,
    BootstrapModule,
    NavbarComponent,
    CommonModule,
    NotFoundComponent,
    LoadingComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
