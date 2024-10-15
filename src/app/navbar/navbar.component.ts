import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http'; // นำเข้า HttpClient
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  searchQuery: string = ''; // ตัวแปรสำหรับเก็บคำค้นหา
  searchResults: any[] = []; // ตัวแปรสำหรับเก็บผลลัพธ์การค้นหา

  constructor(private authService: AuthService, private http: HttpClient,private cartService: CartService,) {}

  ngOnInit(): void {
    // สมัครสมาชิกเพื่อรับการอัปเดตข้อมูลผู้ใช้จาก AuthService
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onSearch(): void {
    if (this.searchQuery && this.searchQuery.trim()) {
      this.http.get<any[]>(`http://localhost:3000/search?q=${this.searchQuery}`)
        .subscribe(data => {
          this.searchResults = data; // เก็บผลลัพธ์การค้นหาใน searchResults
          console.log('Search Results:', this.searchResults);
        }, error => {
          console.error('Error searching products', error);
          this.searchResults = []; // เคลียร์ผลลัพธ์ถ้าการค้นหาล้มเหลว
        });
    } else {
      alert('Please enter a search term');
    }
  }

  // ฟังก์ชันสำหรับเพิ่มสินค้าไปยังตะกร้า
  addToCart(product: any) {
    console.log('ปุ่มถูกกด, สินค้าที่ถูกส่ง:', product);  // ตรวจสอบว่าฟังก์ชันถูกเรียกเมื่อกดปุ่ม
    const productToAdd = { ...product, quantity: 1 };
    this.cartService.addToCart(productToAdd);
    console.log('สินค้าถูกเพิ่มในตะกร้า');
  }

  onLogout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
