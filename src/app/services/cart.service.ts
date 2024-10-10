import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];  // เก็บรายการสินค้าในตะกร้า

  constructor() {}

  // ฟังก์ชันสำหรับดึงรายการสินค้าในตะกร้า
  getItems() {
    return this.items;
  }

  // ฟังก์ชันสำหรับเพิ่มสินค้าในตะกร้า
  addToCart(product: any) {
    const existingProduct = this.items.find(item => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;  // ถ้าสินค้ามีอยู่แล้ว ให้เพิ่มจำนวน
    } else {
      this.items.push(product);  // ถ้าไม่มีสินค้าอยู่ในตะกร้า ให้เพิ่มเข้าไปใหม่
    }
    console.log(this.items);  // ตรวจสอบว่าสินค้าอยู่ในตะกร้าหรือไม่
  }

  // ฟังก์ชันสำหรับล้างตะกร้า
  clearCart() {
    this.items = [];
    return this.items;
  }
}
