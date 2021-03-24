import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    CollapseModule,
    ModalModule
  ],
})
export class BootstrapModule { }
