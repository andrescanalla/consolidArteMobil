import { Component, ViewChild} from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';




import { DataService } from './services/data.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  appPages: Array<any>;
  ordenID: string;

  @ViewChild('nav') nav: NavController;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route1: ActivatedRoute,
    private router: Router,
    private data: DataService
  ) {
    this.initializeApp();
    this.data.currentMessage.subscribe(message => {
      if (this.appPages) {
      this.appPages[1].url = 'planilla/' + message;
      this.appPages[0].url = 'show/' + message;
      this.appPages[2].url = 'carga/' + message;
      console.log('appPages home url:', this.appPages[0].url, 'appPages show url:', this.appPages[1].url);
      }
    });
    this.ordenID = this.route1.snapshot.paramMap.get('id');
    this.appPages = [
      {
        title: 'Orden de Trabajo',
        url: '/setting',
        icon: 'list-box'
      },
      {
        title: 'Planilla',
        url: '/setting',
        icon: 'clipboard'
      },
      {
        title: 'Carga Romaneo',
        url: '/setting',
        icon: 'list'
      },
      {
        title: 'Fotos',
        url: '/list',
        icon: 'images'
      },
      {
        title: 'Setting OTP',
        url: '/setting',
        icon: 'settings'
      },
      {
        title: 'LogOut',
        url: '/logout',
        icon: 'log-out'
      }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(environment.firebase);
  }

  openPage(page) {
    console.log('as', page.url);
    this.router.navigateByUrl(page.url);
  }
}
