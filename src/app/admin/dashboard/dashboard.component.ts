import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalSales: number = 0;
  newOrders: number = 0;
  activeUsers: number = 0;
  revenue: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getTotalSales().subscribe(data => {
      console.log('Total Sales Data:', data);  // Log ข้อมูล
      this.totalSales = data.totalSales;
    });
  
    this.dashboardService.getNewOrders().subscribe(data => {
      console.log('New Orders Data:', data);  // Log ข้อมูล
      this.newOrders = data.newOrders;
    });
  
    this.dashboardService.getActiveUsers().subscribe(data => {
      console.log('Active Users Data:', data);  // Log ข้อมูล
      this.activeUsers = data.activeUsers;
    });
  
    this.dashboardService.getRevenue().subscribe(data => {
      console.log('Revenue Data:', data);  // Log ข้อมูล
      this.revenue = data.totalRevenue;
    });
  }
}
