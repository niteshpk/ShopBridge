import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  loadingProducts = true;
  modalRef: BsModalRef;
  deleteProductObj: any;
  subscriptions: Subscription[] = [];
  products = [];
  notFoundTitle = 'No products found!';
  notFoundDescription = 'Currently there are no products available to show! Please add to some products to show.';

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadingProducts = true;
    this.subscriptions.push(
      this.productService.getProducts().subscribe(
        (response: any) => {
          this.products = response;
          this.loadingProducts = false;
        },
        (error) => {
          this.loadingProducts = false;
          this.toastr.error(
            'Unable to load the products. Please try again.',
            'Failed!'
          );
          console.log('error:', error);
        }
      )
    );
  }

  redirectToNewProductForm() {
    this.router.navigateByUrl('/products/new');
  }

  redirectToEditProductForm(product) {
    this.router.navigateByUrl(`/products/edit/${product.id}`);
  }

  openModal(template: TemplateRef<any>, product) {
    this.deleteProductObj = product;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.deleteProduct();
  }

  deleteProduct() {
    this.subscriptions.push(
      this.productService.deleteProduct(this.deleteProductObj.id).subscribe(
        (response: any) => {
          this.products = this.products.filter(
            (p) => p.id !== this.deleteProductObj.id
          );
          this.deleteProductObj = null;
          this.toastr.success('Products deleted successfully.', 'Successful!');
        },
        (error) => {
          this.toastr.error(
            'Unable to delete the product. Please try again.',
            'Failed!'
          );
          console.log('error:', error);
        }
      )
    );
  }

  decline(): void {
    this.modalRef.hide();
    this.deleteProductObj = null;
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((s) => s.unsubscribe());
    }
  }
}
