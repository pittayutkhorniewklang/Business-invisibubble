import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllproductComponent } from './allproduct/allproduct.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { KidsComponent } from './kids/kids.component';
import { LoginComponent } from './login/login.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { OriginalComponent } from './original/original.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { RegisterComponent } from './register/register.component';
import { SprunchieComponent } from './sprunchie/sprunchie.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    DashboardComponent,
    SidebarComponent,

    AllproductComponent,
    HomeComponent,
    CartComponent,
    ContactUsComponent,
    KidsComponent,
    LoginComponent,
    NewproductComponent,
    OriginalComponent,
    ProductdetailComponent,
    RegisterComponent,
    SprunchieComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
