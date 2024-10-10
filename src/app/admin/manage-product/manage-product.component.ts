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

    // ใช้ JSON ธรรมดาแทนการใช้ FormData
    const productData = {
      name: this.product.name,
      category: this.product.category,
      brand: this.product.brand,
      stock: this.product.stock,
      price: this.product.price,
      description: this.product.description,
      image: this.selectedFile // เก็บไฟล์ที่ถูกเลือก
    };

    console.log('Product data being sent:', productData);  // ตรวจสอบข้อมูลที่ส่งออก

    if (this.isEditing) {
      this.productService.editProduct(this.product._id, productData).subscribe(() => {
        console.log('Product edited successfully!');
        this.loadProducts();  // โหลดสินค้าทั้งหมดใหม่หลังจากแก้ไขสำเร็จ
        this.resetForm();  // รีเซ็ตข้อมูลฟอร์ม
      }, (error) => {
        console.error('Error editing product:', error);
      });
    } else {
      this.productService.addProduct(productData).subscribe(() => {
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

  // ฟังก์ชันสำหรับแก้ไขสินค้า
  editProduct(product: any) {
    this.product = { ...product };  // คัดลอกข้อมูลสินค้าที่ต้องการแก้ไข
    this.selectedFile = null;  // เคลียร์ไฟล์ที่เลือกเพื่อให้ผู้ใช้เลือกไฟล์ใหม่ถ้าต้องการ
    this.isEditing = true;  // ตั้งสถานะว่าอยู่ในโหมดแก้ไข
  }

  // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม
  resetForm() {
    this.product = {};  // เคลียร์ข้อมูลฟอร์ม
    this.selectedFile = null;  // รีเซ็ตไฟล์ที่เลือก
    this.isEditing = false;  // ตั้งสถานะว่าไม่อยู่ในโหมดแก้ไข
  }
}
