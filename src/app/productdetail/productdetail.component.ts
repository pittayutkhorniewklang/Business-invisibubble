import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  product: any = {}; // ตัวแปรเก็บข้อมูลสินค้า
  quantity: number = 1; // ตัวแปรเก็บจำนวนสินค้า
  defaultImageUrl: string = 'assets/default.jpg'; // รูปภาพเริ่มต้นเมื่อไม่มีรูป

  constructor(
    private route: ActivatedRoute, // ใช้ ActivatedRoute เพื่อดึงพารามิเตอร์จาก URL
    private productService: ProductService, // ใช้บริการ ProductService เพื่อดึงข้อมูลสินค้า
    private cartService: CartService, // เพิ่ม CartService
    private router: Router // Router เพื่อใช้ในการเปลี่ยนเส้นทาง
  ) {}

  ngOnInit(): void {
    // ดึง productId จาก URL
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', productId); // ตรวจสอบการดึงค่า productId

    // ตรวจสอบว่ามีค่า productId หรือไม่
    if (productId) {
      this.loadProduct(productId);
    } else {
      console.error('Product ID is undefined');
      this.router.navigate(['/']); // เปลี่ยนเส้นทางไปที่หน้าหลักเมื่อไม่พบ Product ID
    }
  }

  // ฟังก์ชันสำหรับโหลดข้อมูลสินค้า
  loadProduct(productId: string) {
    this.productService.getProductById(productId).subscribe(
      (data: any) => {
        if (!data) {
          alert('Product not found.');
          console.warn('No product data returned.');
          this.router.navigate(['/']); // เปลี่ยนเส้นทางไปที่หน้าหลักเมื่อไม่พบสินค้า
          return;
        }

        this.product = data;
        console.log('Product data:', this.product); // ตรวจสอบข้อมูลสินค้าที่ดึงมา

        // ตรวจสอบ URL รูปภาพ ถ้าไม่มีให้ใช้รูปเริ่มต้น
        if (!this.isValidImageUrl(this.product.imageUrl)) {
          console.warn('Invalid or missing image URL:', this.product.imageUrl);
          this.product.imageUrl = this.defaultImageUrl; // ใช้รูปภาพเริ่มต้น
        }
      },
      (error: any) => {
        console.error('Error fetching product:', error);
        alert('Error loading product. Please try again later.');
        this.router.navigate(['/']); // เปลี่ยนเส้นทางไปที่หน้าหลักเมื่อเกิดข้อผิดพลาด
      }
    );
  }

  // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้า
  increaseQuantity() {
    this.quantity++;
  }
  
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // ฟังก์ชันสำหรับเพิ่มสินค้าไปยังตะกร้า
  addToCart() {
    const productToAdd = { ...this.product, quantity: this.quantity };
    this.cartService.addToCart(productToAdd); // เพิ่มสินค้าลงในตะกร้า
    alert('Added to cart!');
  }

  // ฟังก์ชันตรวจสอบความถูกต้องของ URL ของรูปภาพ
  isValidImageUrl(url: string): boolean {
    return typeof url === 'string' && url.trim().length > 0 && (url.startsWith('http://') || url.startsWith('https://'));
  }
}
