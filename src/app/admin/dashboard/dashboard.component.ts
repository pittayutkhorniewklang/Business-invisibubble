import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedMonth: string = new Date().toISOString().substring(0, 7); // ค่าเริ่มต้นเป็นเดือนปัจจุบัน
  monthlySales: any;
  totalMonthlySales: number = 0;
  topSellingProducts: any[] = [];
  constructor(private orderService: OrderService, private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchMonthlySales();
    this.fetchTopSellingProducts();
  }

  fetchMonthlySales() {
    this.orderService.getMonthlySales(this.selectedMonth).subscribe((data: any) => {
      this.monthlySales = data;
      this.totalMonthlySales = this.monthlySales.reduce((acc: number, sale: any) => acc + sale.amount, 0);
    });
  }

  fetchTopSellingProducts() {
    this.productService.getTopSellingProducts().subscribe((data: any) => {
      this.topSellingProducts = data;
    });
  }
  
}
