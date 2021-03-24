import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  productsCount = 0;
  subscriptions: Subscription[] = [];
  loadingProducts = true;

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductsCount();
  }

  getProductsCount() {
    this.loadingProducts = true;
    this.subscriptions.push(
      this.dashboardService.getProductsCount().subscribe(
        (response: any) => {
          this.loadingProducts = false;
          this.productsCount = response.headers.get('X-Total-Count');
        },
        (error) => {
          this.loadingProducts = false;
          this.toastr.error(
            'Unable to load the products count. Please try again.',
            'Failed!'
          );
        }
      )
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((s) => s.unsubscribe());
    }
  }
}
