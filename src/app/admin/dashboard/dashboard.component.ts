import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service'; // DashboardService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedMonth: string = '';  // กำหนดค่า default เป็น string เปล่า
  totalMonthlySales: number = 0;
  topSellingProducts: any[] = [];
  startDate: string = '';
  endDate: string = '';
  totalSalesRange: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchTopSellingProducts();
  }

  // เรียกข้อมูลยอดขายรายเดือน
  fetchMonthlySales(): void {
    this.dashboardService.getMonthlySales(this.selectedMonth).subscribe({
      next: (response) => {
        this.totalMonthlySales = response.totalSales;
        console.log('ยอดขายรวมรายเดือน:', this.totalMonthlySales);
      },
      error: (err) => {
        console.error('Error fetching monthly sales:', err);
      }
    });
  }

  // เรียกข้อมูลสินค้าขายดี
  fetchTopSellingProducts(): void {
    this.dashboardService.getTopSellingProducts().subscribe({
      next: (response) => {
        this.topSellingProducts = response.products;
        console.log('สินค้าขายดี:', this.topSellingProducts);
      },
      error: (err) => {
        console.error('Error fetching top-selling products:', err);
      }
    });
  }

  // เรียกข้อมูลยอดขายตามช่วงเวลา
  fetchSalesRange(): void {
    if (this.startDate && this.endDate) {
      this.dashboardService.getSalesByRange(this.startDate, this.endDate).subscribe({
        next: (response) => {
          this.totalSalesRange = response.totalSales;
          console.log('ยอดขายในช่วงเวลา:', this.totalSalesRange);
        },
        error: (err) => {
          console.error('Error fetching sales by range:', err);
        }
      });
    } else {
      console.warn('กรุณาเลือกวันที่ให้ครบถ้วน');
    }
  }
}
