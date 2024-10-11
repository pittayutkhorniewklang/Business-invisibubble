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
      console.error('Please fill out all required fields.');
      return;
    }

    // ตรวจสอบว่าเป็นการแก้ไขหรือไม่
    if (this.isEditing) {
      if (!this.product._id) {
        console.error('Product ID is missing.');
        return;
      }
      this.productService.editProduct(this.product._id, this.product).subscribe(() => {
        console.log('Product edited successfully!');
        this.loadProducts();
        this.resetForm();
      }, (error) => {
        console.error('Error editing product:', error);
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        console.log('Product added successfully!');
        this.loadProducts();
        this.resetForm();
      }, (error) => {
        console.error('Error adding product:', error);
      });
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      }, (error) => {
        console.error('Error deleting product:', error);
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
