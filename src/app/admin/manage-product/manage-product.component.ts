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
  selectedFile: File | null = null;  // เก็บไฟล์ที่เลือก
  isEditing: boolean = false;  // ตรวจสอบว่าอยู่ในโหมดแก้ไขหรือไม่

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();  // โหลดสินค้าทั้งหมดเมื่อเริ่มต้น
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('Products fetched:', data);
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  onSubmit(event: Event) {
    event.preventDefault();
  
    if (!this.product.name || !this.product.category || !this.product.price) {
      console.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
  
    // สร้าง FormData สำหรับส่งข้อมูลสินค้า
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('category', this.product.category);
    formData.append('brand', this.product.brand);
    formData.append('stock', this.product.stock.toString());
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);

    // ตรวจสอบว่ามีไฟล์ที่เลือกหรือไม่ และเพิ่มไฟล์ลงใน FormData
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    // ตรวจสอบว่าเป็นการแก้ไขสินค้าหรือไม่
    if (this.isEditing) {
      if (!this.product._id) {
        console.error('Product ID หายไป');
        return;
      }
      this.productService.editProduct(this.product._id, formData).subscribe(() => {
        console.log('แก้ไขสินค้าสำเร็จ!');
        this.loadProducts();
        this.resetForm();
      }, (error) => {
        console.error('เกิดข้อผิดพลาดในการแก้ไขสินค้า:', error);
      });
    } else {
      this.productService.addProduct(formData).subscribe(() => {
        console.log('เพิ่มสินค้าสำเร็จ!');
        this.loadProducts();
        this.resetForm();
      }, (error) => {
        console.error('เกิดข้อผิดพลาดในการเพิ่มสินค้า:', error);
      });
    }
  }

  deleteProduct(id: string) {
    if (confirm('คุณแน่ใจว่าต้องการลบสินค้านี้หรือไม่?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      }, (error) => {
        console.error('เกิดข้อผิดพลาดในการลบสินค้า:', error);
      });
    }
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.selectedFile = null;
    this.isEditing = true;
  }

  resetForm() {
    this.product = {};
    this.selectedFile = null;
    this.isEditing = false;
  }
}
