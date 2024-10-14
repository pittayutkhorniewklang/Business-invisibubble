import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // นำเข้า OrderService
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log(this.orders); // ตรวจสอบข้อมูลที่ดึงมา
      },
      error: (err: any) => {  // แก้ไขเพื่อให้ err เป็นชนิด any
        console.error('Error fetching orders:', err);
      }
    });
  }

  rejectOrder(orderId: string): void {
    if (confirm('Are you sure you want to reject this order?')) {
      this.orderService.rejectOrder(orderId).subscribe(() => {
        this.orders = this.orders.filter(order => order._id !== orderId);  // ใช้ order._id แทน order.id
      });
    }
  }
}
