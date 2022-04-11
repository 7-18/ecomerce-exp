import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CarouselComponent } from './home/carousel/carousel.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { InfoComponent } from './product/info/info.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { WishlistComponent } from './wishlist/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: CarouselComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list-products', component: ListProductsComponent },
  { path: 'product-info/:id', component: InfoComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
