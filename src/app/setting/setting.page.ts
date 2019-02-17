import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpRequestService } from '../services/httpRequest.service';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss']
})
export class SettingPage implements OnInit {

  ordenes: any;
  private route = '/ordenes';
  public orden: any;

  constructor(
    public alertController: AlertController,
    private ordenService: HttpRequestService,
    private router: Router,
    public toastController: ToastController,
    private data: DataService
    ) {

  }

  ngOnInit() {
    this.getOrdenes();
    console.log('ordenes:', this.ordenes);
  }

  getOrdenes() {
    this.ordenes = this.ordenService.getAll(this.route).snapshotChanges();
  }

  settingOrden(orden) {
    this.data.changeMessage(orden.key);
    this.presentToast('Your orden has been selected');
    this.router.navigate(['/show', orden.key]);
  }

  async presentAlertConfirm(orden) {
    const alert = await this.alertController.create({
      header: `OTP: ${orden.payload.val().name}`,
      message:  `<strong>Date: </strong> ${orden.payload.val().date} <br> <strong>Place: </strong> ${orden.payload.val().place}<br> <strong>Commodity: </strong> ${orden.payload.val().commodity}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Select',
          handler: () => {
            console.log('Confirm Okay', orden);
            this.orden = orden.key;
            this.settingOrden(orden);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'toast-success'
    });
    toast.present();
  }

}
