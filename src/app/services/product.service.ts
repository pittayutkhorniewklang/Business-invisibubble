import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products'; // URL ของ API

  constructor(private http: HttpClient) {}

  // ฟังก์ชันสำหรับดึงสินค้าทั้งหมด
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
  }

  // ฟังก์ชันสำหรับดึงสินค้าตาม ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
  }

  // ฟังก์ชันสำหรับเพิ่มสินค้าใหม่
  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product).pipe(
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
  }

  // ฟังก์ชันสำหรับแก้ไขสินค้า
  editProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product).pipe(
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
  }

  // ฟังก์ชันสำหรับลบสินค้า
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // จัดการข้อผิดพลาด
    );
  }

  // ฟังก์ชันสำหรับจัดการข้อผิดพลาด
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side หรือ Network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage); // แสดงข้อผิดพลาดในคอนโซล
    return throwError(() => new Error(errorMessage)); // ส่งข้อผิดพลาดกลับไป
  }
    // ฟังก์ชันสำหรับดึงสินค้าขายดี
    getTopSellingProducts(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/top-selling`);
    }
}
