import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ShowOrdenesComponent } from './show.orden.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShowOrdenesComponent
      }
    ])
  ],
  declarations: [ShowOrdenesComponent]
})
export class ShowOrdenesModule {}
