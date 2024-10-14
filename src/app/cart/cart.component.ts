import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';  // นำเข้า OrderService
import { Router } from '@angular/router';  // นำเข้า Router
import { AuthService } from '../services/auth.service';  // นำเข้า AuthService

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any[] = [];  // เก็บรายการสินค้าในตะกร้า
  total: number = 0;  // ตัวแปรสำหรับเก็บยอดรวม

  constructor(
    private cartService: CartService,
    private orderService: OrderService,  // Inject OrderService
    private authService: AuthService,  // Inject AuthService
    private router: Router  // Inject Router
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    console.log(this.items);  // ตรวจสอบว่ารายการสินค้าในตะกร้าถูกต้องหรือไม่
    this.calculateTotal();
  }

  // ฟังก์ชันสำหรับลดจำนวนสินค้า
  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();  // คำนวณยอดรวมใหม่หลังจากการเปลี่ยนแปลง
    }
  }

  // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้า
  incrementQuantity(item: any) {
    item.quantity++;
    this.calculateTotal();  // คำนวณยอดรวมใหม่หลังจากการเปลี่ยนแปลง
  }

  // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
  removeItem(item: any) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);  // ลบสินค้าจากตะกร้า
      this.calculateTotal();  // คำนวณยอดรวมใหม่หลังจากการลบ
    }
  }

  // ฟังก์ชันสำหรับคำนวณยอดรวม
  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // ฟังก์ชันสำหรับล้างตะกร้า
  clearCart() {
    this.items = this.cartService.clearCart();  // ล้างสินค้าในตะกร้า
    this.total = 0;  // ตั้งยอดรวมเป็น 0
  }

  // ฟังก์ชันสำหรับดำเนินการสั่งซื้อ
  placeOrder() {
    const order = {
      customer_name: this.authService.getUserName(),
      order_items: this.items.map(item => ({
        productId: item._id,
        name: item.name, // เพิ่มการดึงชื่อสินค้าจากข้อมูลใน array
        price: item.price,
        quantity: item.quantity
      })),
      delivery_price: 70
    };
  
    // ส่งข้อมูลไปยัง backend
    this.orderService.createOrder(order).subscribe({
      next: (res) => {
        console.log('คำสั่งซื้อสำเร็จ:', res);
        this.clearCart();  // ล้างตะกร้าหลังสั่งซื้อเสร็จ
      },
      error: (err) => {
        console.error('เกิดข้อผิดพลาดในการสั่งซื้อ:', err);
      }
    });
  }
  
}
