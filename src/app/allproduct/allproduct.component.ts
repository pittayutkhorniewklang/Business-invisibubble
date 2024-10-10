import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrl: './allproduct.component.css'
})
export class AllproductComponent implements OnInit{
  products: any[] = [];  // ตัวแปรเก็บสินค้าทั้งหมด
  filteredProducts: any[] = [];  // ตัวแปรเก็บสินค้าที่ถูกกรอง

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private router: Router  // Inject Router
  ) { }

  ngOnInit(): void {
    // ดึงข้อมูลสินค้าทั้งหมดจาก ProductService
    this.productService.getProducts().subscribe({
      next: (data: any[]) => {
        this.products = data;  // เก็บข้อมูลสินค้าทั้งหมด
        this.filterProducts(); // กรองสินค้าตามหมวดหมู่
      },
      error: (error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error);  // แสดงข้อผิดพลาดหากดึงข้อมูลไม่สำเร็จ
      }
    });
  }

  // ฟังก์ชันกรองสินค้าตามหมวดหมู่
  filterProducts() {
    this.filteredProducts = this.products.filter(product => 
      product.category && product.category.includes('allproduct')
    );

    // ถ้าต้องการแสดงสินค้าทั้งหมด ให้ลบเงื่อนไขการกรองออกหรือทำแบบนี้:
    // this.filteredProducts = this.products; // แสดงสินค้าทั้งหมด
  }

  // ฟังก์ชันสำหรับเพิ่มสินค้าไปยังตะกร้า
  addToCart(product: any) {
    console.log('ปุ่มถูกกด, สินค้าที่ถูกส่ง:', product);  // ตรวจสอบว่าฟังก์ชันถูกเรียกเมื่อกดปุ่ม
    const productToAdd = { ...product, quantity: 1 };
    this.cartService.addToCart(productToAdd);
    console.log('สินค้าถูกเพิ่มในตะกร้า');
  }
}


