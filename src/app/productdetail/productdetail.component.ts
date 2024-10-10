import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent implements OnInit{
  product: any = {};  // ตัวแปรเก็บข้อมูลสินค้า
  quantity: number = 1;  // ตัวแปรเก็บจำนวนสินค้า

  constructor(
    private route: ActivatedRoute,  // ใช้ ActivatedRoute เพื่อดึงพารามิเตอร์จาก URL
    private productService: ProductService,  // ใช้บริการ ProductService เพื่อดึงข้อมูลสินค้า
    private cartService: CartService  // เพิ่ม CartService
  ) {}

  ngOnInit(): void {
    // ดึง productId จาก URL
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', productId); // ตรวจสอบการดึงค่า productId

    // ตรวจสอบว่ามีค่า productId หรือไม่
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data: any) => {
          this.product = data;
          console.log('Product data:', this.product);  // ตรวจสอบข้อมูลสินค้าที่ดึงมา
          console.log('Image URL:', this.product.image);  // ตรวจสอบ URL รูปภาพ
        },
        (error: any) => {
          console.error('Error fetching product:', error);
        }
      );
    } else {
      console.error('Product ID is undefined');
    }
  }

  // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้า
  increaseQuantity() {
    this.quantity++;
  }

  // ฟังก์ชันสำหรับลดจำนวนสินค้า
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // ฟังก์ชันสำหรับเพิ่มสินค้าไปยังตะกร้า
  addToCart() {
    const productToAdd = { ...this.product, quantity: this.quantity };
    this.cartService.addToCart(productToAdd);  // เพิ่มสินค้าลงในตะกร้า
    alert('Added to cart!');
  }

  // ฟังก์ชันตรวจสอบความถูกต้องของ URL ของรูปภาพ
  isValidImageUrl(url: string): boolean {
    return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
  }
}


