import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './car-add/car-add.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarUpdateComponent } from './car-update/car-update.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "car-details/:id", component: CarDetailsComponent },
  { path: "contact", component: ContactComponent },
  { path: "update/:id",  component:CarUpdateComponent },
  { path: "add", component: CarAddComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: '/404', pathMatch: "full" },
  { path: "404", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
