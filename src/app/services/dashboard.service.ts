import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/dashboard';

  constructor(private http: HttpClient) {}

  getMonthlySales(month: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sales/monthly/${month}`);
  }

  getSalesRange(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sales/range?startDate=${startDate}&endDate=${endDate}`);
  }

  getTopSellingProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/top-selling`);
  }

  getSalesChart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sales/chart`);
  }
}
