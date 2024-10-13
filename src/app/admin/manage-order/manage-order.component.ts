import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // นำเข้า OrderService

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();  // ดึงข้อมูลคำสั่งซื้อเมื่อ Component โหลด
  }

  // ฟังก์ชันดึงคำสั่งซื้อทั้งหมด
  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (data: any[]) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  // ฟังก์ชันสำหรับรีเจ็คคำสั่งซื้อ
  rejectOrder(orderId: number) {
    if (confirm('คุณต้องการรีเจ็คคำสั่งซื้อใช่หรือไม่?')) {
      this.orderService.rejectOrder(orderId).subscribe({
        next: () => {
          alert('รีเจ็คคำสั่งซื้อสำเร็จ');
          this.loadOrders();  // รีโหลดคำสั่งซื้อใหม่หลังจากรีเจ็คสำเร็จ
        },
        error: (err) => {
          console.error('Error rejecting order:', err);
        }
      });
    }
  }
}
