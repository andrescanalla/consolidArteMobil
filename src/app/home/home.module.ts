import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ContenedorPage } from './contenedor/contenedor.page';
import { AuthGuard } from '../services/user/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: ':id/contenedor/:array',
        component: ContenedorPage,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: HomePage,
        canActivate: [AuthGuard],
      }
    ])
  ],
  declarations: [HomePage, ContenedorPage]
})
export class HomePageModule {}
