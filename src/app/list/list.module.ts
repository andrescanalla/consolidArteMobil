import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import { AuthGuard } from '../services/user/auth.guard';
import { CargaPage } from './carga/carga.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: ':id/contenedor/:array',
        component: CargaPage,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: ListPage,
        canActivate: [AuthGuard],
      }
    ])
  ],
  declarations: [ListPage, CargaPage]
})
export class ListPageModule {}
