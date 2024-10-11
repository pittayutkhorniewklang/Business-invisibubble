import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { AllproductComponent } from './allproduct/allproduct.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { KidsComponent } from './kids/kids.component';
import { LoginComponent } from './login/login.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { OriginalComponent } from './original/original.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { RegisterComponent } from './register/register.component';
import { SprunchieComponent } from './sprunchie/sprunchie.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // Lazy loading สำหรับโมดูล admin
  },

  {path:'',component:HomeComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'admin/dashboard',component:DashboardComponent},
  {path:'home',component:HomeComponent},
  {path:'allproduct',component:AllproductComponent},
  {path:'cart',component:CartComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'kids',component:KidsComponent},
  {path:'login',component:LoginComponent},
  {path:'newproduct',component:NewproductComponent},
  {path:'original',component:OriginalComponent},
  {path:'product/:id',component:ProductdetailComponent},
  {path:'register',component:RegisterComponent},
  {path:'sprunchie',component:SprunchieComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
