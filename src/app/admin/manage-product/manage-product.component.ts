import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  products: any[] = [];  // เก็บสินค้าทั้งหมด
  product: any = {};  // เก็บข้อมูลสินค้าใหม่หรือสินค้าแก้ไข
  selectedFile: File | null = null;  // เก็บไฟล์ที่ถูกเลือก
  isEditing: boolean = false;  // ตรวจสอบว่าอยู่ในโหมดแก้ไขหรือไม่

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();  // โหลดสินค้าทั้งหมดเมื่อเริ่มต้น
  }

  // ฟังก์ชันสำหรับโหลดสินค้าทั้งหมด
  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('Products fetched:', data);  // ตรวจสอบว่ามีข้อมูลถูกดึงมาหรือไม่
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // ฟังก์ชันสำหรับอัปโหลดไฟล์
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  // ฟังก์ชันสำหรับบันทึกการเพิ่มหรือแก้ไขสินค้า
  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.product.name || !this.product.category || !this.product.price) {
      console.error('Please fill out all required fields.');
      return;
    }

    // สร้าง FormData สำหรับส่งข้อมูลไปยัง API
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('category', this.product.category);
    formData.append('brand', this.product.brand);
    formData.append('stock', this.product.stock.toString());
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile); // เพิ่มไฟล์ภาพลงใน FormData
    }

    console.log('Product data being sent:', formData);  // ตรวจสอบข้อมูลที่ส่งออก

    if (this.isEditing) {
      this.productService.editProduct(this.product._id, formData).subscribe(() => {
        console.log('Product edited successfully!');
        this.loadProducts();  // โหลดสินค้าทั้งหมดใหม่หลังจากแก้ไขสำเร็จ
        this.resetForm();  // รีเซ็ตข้อมูลฟอร์ม
      }, (error) => {
        console.error('Error editing product:', error);
      });
    } else {
      this.productService.addProduct(formData).subscribe(() => {
        console.log('Product added successfully!');
        this.loadProducts();  // โหลดสินค้าทั้งหมดใหม่หลังจากเพิ่มสำเร็จ
        this.resetForm();  // รีเซ็ตข้อมูลฟอร์ม
      }, (error) => {
        console.error('Error adding product:', error);
      });
    }
  }

  // ฟังก์ชันสำหรับลบสินค้า
  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();  // โหลดสินค้าทั้งหมดใหม่หลังจากลบสำเร็จ
      }, (error) => {
        console.error('Error deleting product:', error);
      });
    }
  }

  // ฟังก์ชันสำหรับรีเซ็ตข้อมูลฟอร์ม
  resetForm() {
    this.product = {};
    this.selectedFile = null;  // รีเซ็ตไฟล์ที่เลือก
    this.isEditing = false;  // ตั้งค่าให้กลับไปเป็นโหมดเพิ่มสินค้า
  }

  // ฟังก์ชันสำหรับการแก้ไขสินค้า
  editProduct(product: any) {
    this.product = { ...product };  // คัดลอกข้อมูลสินค้าที่เลือกมาในฟอร์ม
    this.isEditing = true;  // เปลี่ยนไปเป็นโหมดแก้ไข
  }
}
