import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ContenedorPage } from './contenedor/contenedor.page';
import { AuthGuard } from '../services/user/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RelModalComponent } from './modal/rel/rel.modal.component';
import { MuestrasModalComponent } from './modal/muestras/muestras.modal.component';
import { ContenedorModalComponent } from './modal/contenedor/contenedor.modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
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
  declarations: [HomePage, ContenedorPage, RelModalComponent, MuestrasModalComponent, ContenedorModalComponent],
  entryComponents: [
    RelModalComponent,
    MuestrasModalComponent,
    ContenedorModalComponent
  ]
})
export class HomePageModule {}
