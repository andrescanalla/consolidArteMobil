import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss']
})
export class SettingPage {
  constructor(public alertController: AlertController) {

  }

  slideOpts = {
    effect: 'flip'
  };

  public miArray = [
    {
      date: '15/01/2019',
      name: '0015-19',
      type: 'Carne',
      commodity: 'Sabalo',
      place: 'Victoria'
    },
    {
      date: '20/01/2019',
      name: '0021-19',
      type: 'Granos',
      commodity: 'Coriandro',
      place: 'Villa Constitucion'
    },
    {
      date: '30/01/2019',
      name: '0032-19',
      type: 'Granos',
      commodity: 'Poroto Mung',
      place: 'Villa Constitucion'
    },
    {
      date: '02/02/2019',
      name: '0035-19',
      type: 'Granos',
      commodity: 'Poroto Mung',
      place: 'Villa Constitucion'
    }
  ];

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      header: 'OTP: ' + item.name,
      message:  '<strong>Date: </strong> ' + item.date +'<br> <strong>Place: </strong> ' + item.place + '<br> <strong>Commodity: </strong> ' + item.commodity,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah', item.name );
          }
        }, {
          text: 'Select',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
