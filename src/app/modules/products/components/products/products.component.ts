import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  deleteProductId = '';

  constructor(
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  redirectToNewProductForm() {
    this.router.navigateByUrl('/products/new');
  }

  redirectToEditProductForm(productId) {
    this.router.navigateByUrl('/products/' + productId );
  }

  
  openModal(template: TemplateRef<any>, productId) {
    this.deleteProductId = productId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
    this.deleteProductId = '';
  }

}
