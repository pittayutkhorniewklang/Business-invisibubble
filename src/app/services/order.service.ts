import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // URL ของ API สำหรับจัดการคำสั่งซื้อ

  constructor(private http: HttpClient) {}

  // ฟังก์ชันสำหรับสร้างคำสั่งซื้อใหม่
  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, order);
  }

  // ฟังก์ชันสำหรับดึงคำสั่งซื้อทั้งหมด
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ฟังก์ชันสำหรับอัปเดตคำสั่งซื้อ (ใช้ number)
  updateOrderStatus(orderId: number, deliveryStatus: string, paymentStatus: string): Observable<any> {  // เปลี่ยนเป็น number
    return this.http.put(`${this.apiUrl}/${orderId}`, { deliveryStatus, paymentStatus });
  }

  // ฟังก์ชันสำหรับรีเจ็คคำสั่งซื้อ (ใช้ number)
  rejectOrder(orderId: number): Observable<any> {  // เปลี่ยนเป็น number
    return this.http.delete(`${this.apiUrl}/${orderId}`);
  }
}
