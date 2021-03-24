import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  action = '';
  productId = 0;
  loading = true;
  productForm: FormGroup;
  saveBtnDisabled = false;
  subscriptions: Subscription[] = [];

  public get productName(): any {
    return this.productForm.controls.name;
  }

  public get productDescription(): any {
    return this.productForm.controls.description;
  }

  public get productPrice(): any {
    return this.productForm.controls.price;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100000),
      ]),
    });

    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe((params) => {
        const id = params.get('productId');

        if (id) {
          const numberRegx = /^[0-9]+$/;
          if (!id.match(numberRegx)) {
            this.toastr.error(
              'Invalid product id. Please try again.',
              'Failed!'
            );
            this.router.navigateByUrl('/products');
            return false;
          }

          this.productId = parseInt(params.get('productId'));
          this.getProduct();
        } else {
          this.loading = false;
        }
      })
    );
  }

  onProductFormSubmit() {
    if (this.productForm.invalid) {
      this.toastr.error(
        'Invalid form fields. Please recheck form again.',
        'Validation Failed!'
      );
      return false;
    }
    this.saveBtnDisabled = true;
    this.productId === 0 ? this.createProduct() : this.updateProduct();
  }

  getProductObject(product?) {
    const productObj: any = {
      name: _.get(product, 'name', ''),
      description: _.get(product, 'description', ''),
      price: _.get(product, 'price', 0),
    };

    return productObj;
  }

  createProduct() {
    this.loading = true;
    this.subscriptions.push(
      this.productService
        .createProduct(this.getProductObject(this.productForm.value))
        .subscribe(
          (response) => {
            this.loading = false;
            this.toastr.success('Products added successfully.', 'Successful!');
            this.saveBtnDisabled = false;
            this.router.navigateByUrl('/products');
          },
          (error) => {
            this.loading = false;
            this.toastr.error(
              'Unable to add the product. Please try again.',
              'Failed!'
            );
            console.log('error:', error);
            this.saveBtnDisabled = false;
          }
        )
    );
  }

  updateProduct() {
    this.loading = true;
    const product = this.getProductObject(this.productForm.value);
    this.subscriptions.push(
      this.productService.updateProduct(product, this.productId).subscribe(
        (response) => {
          this.loading = false;
          this.toastr.success('Products updated successfully.', 'Successful!');
          this.saveBtnDisabled = false;
          this.router.navigateByUrl('/products');
        },
        (error) => {
          this.loading = false;
          this.toastr.error(
            'Unable to update the product. Please try again.',
            'Failed!'
          );
          console.log('error:', error);
          this.saveBtnDisabled = false;
        }
      )
    );
  }

  getProduct() {
    this.loading = true;
    this.subscriptions.push(
      this.productService.getProduct(_.cloneDeep(this.productId)).subscribe(
        (response: any) => {
          this.loading = false;
          delete response.id;
          this.productForm.patchValue(response);
        },
        (error) => {
          this.loading = false;
          this.toastr.error(
            'Unable to get the product details. Please try again.',
            'Failed!'
          );
          console.log('error:', error);
          this.router.navigateByUrl('/products');
        }
      )
    );
  }

  back() {
    this.router.navigateByUrl('/products');
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((s) => s.unsubscribe());
    }
  }
}
