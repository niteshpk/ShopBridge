import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { BootstrapModule } from '../../bootstrap.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    BootstrapModule,
    RouterModule,
  ],
  exports:[
    BootstrapModule,
    NavbarComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
