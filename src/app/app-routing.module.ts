import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './component/restaurants/restaurants.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { AdminComponent } from './component/admin/admin.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { AdminGuard } from './guards/adminguard';
import { UserViewDetailsComponent } from './component/user-view-details/user-view-details.component';
import { HomeComponent } from './component/home/home.component';
import { MenuComponent } from './component/menu/menu.component';
import { OutputComponent } from './component/output/output.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { CardComponent } from './component/card/card.component';
import { RestaurantOwnerComponent } from './component/restaurant-owner/restaurant-owner.component';
import { RownerGuard} from './guards/rOwnerGuard';


const routes: Routes = [
  {path:'restaurants',component:RestaurantsComponent},
  {path:'contacts',component:ContactsComponent},
  {path:'admin',component:AdminComponent,canActivate:[AdminGuard]},
  {path:'rowner',component:RestaurantOwnerComponent,canActivate:[RownerGuard]},
  {path:'aboutus',component:AboutUsComponent},
  {path:'',component:HomeComponent},
  {path:'users/:id',component:UserViewDetailsComponent},   // ,canActivate:[AdminGuard]
  {path:'menu/:id', component:MenuComponent},
  {path:'card/:id', component:CardComponent},
  {path:'output', component:OutputComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*,{enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
