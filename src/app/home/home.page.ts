import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts = {
    effect: 'flip',
  };
  ordenGranosForm: FormGroup;
  private route = '/ordenes';
  isEdit: boolean;
  showCarnes = true;
  showGranos = true;
  public isCollapsedControl = true;
  public isCollapsedCalidad = true;
  public isCollapsedCertificado = true;
  public isCollapsedFacturacion = true;
  public isCollapsedOtras = true;
  location: any;

  constructor(
    private route1: ActivatedRoute,
    private ordenService: HttpRequestService,
    private fb: FormBuilder,
    public toastController: ToastController,
    private router: Router,

  ) { }

  ngOnInit() {
    this.createForm();
    const ordenID = this.route1.snapshot.paramMap.get('id');
    this.updateForm(ordenID);
  }

  createForm() {
    this.ordenGranosForm = this.fb.group({
      name: ['', Validators.required ],
      type: ['Granos'],
      date: [''],
      hour: [''],
      place: [''],
      vessel: [''],
      customerResf: [''],
      commodity: [''],
      CTNQuantity: [''],
      CTNCapacity: [''],
      CTNCapacityKg: [''],
      destination: [''],
      charger: [''],
      buyer: [''],
      conditioning: ['No'],
      conditioningDesc: [''],
      requirements: [''],
      fumigationType: [''],
      fumigantCompany: [''],
      plantManagerName: [''],
      plantManagerPhone: [''],
      customsBrokerName: [''],
      customsBrokerPhone: [''],
      size: [''],
      foreingMatter: [''],
      brokenSkin: [''],
      otherDefects: [''],
      undersize: [''],
      splits: [''],
      stained: [''],
      freeLiveInsects: [''],
      certificate1: [''],
      certificate2: [''],
      certificate3: [''],
      certificate4: [''],
      billing: [''],
      otherSpecifications1: [''],
      otherSpecifications2: [''],
      otherSpecifications3: [''],
      otherSpecifications4: [''],
      planilla: this.fb.group({
        fechaIni: [''],
        fechaFin: '',
        origen: [''],
        contenedores: [{
          romaneo: this.fb.group({
            date: '',
            name: '',
            kgNetosNetos: '',
            kgNetos: '',
            bolsas: '',
            granel: '',
            lote: '',
            }),
            precintos: this.fb.group({
                paneos: '',
                aduana: '',
                agencia: '',
            }),
            camiones: this.fb.group({
                chapa: '',
                bruto: '',
                tara: '',
                neto: '',
                origen: '',
            }),
        }],
        inspector: [this.fb.group({
            name: '',
            mat: '',
            org: '',
        })],
        estadoCTN: '',
        acondicionamiento: '',
        fumigante: '',
        empresaFum: '',
        marcas: '',
        envases: '',
        muestrasCTN: '',
        muestrasGeneral: '',
        otras: '',
        comment: '',
        timeLog: [this.fb.group({
            date: '',
            hour: '',
            descripcion: '',
        })],
        muestras: [this.fb.group({
            tipo: '',
            cantArchivo: '',
            precintoArcvhivo: '',
            cantCliente: '',
            precintoCliente: '',
            cantOtros: '',
            precintoOtros: '',
        })]
      })
   });
  }

  updateForm(orderId) {
    this.isEdit = true;
    this.ordenService.getById(this.route + '/' + orderId).valueChanges().subscribe(orderObject => {
      this.showCarnes = this.showCarnesTab(orderObject);
      this.showGranos = this.showGranosTab(orderObject);
      this.ordenGranosForm.patchValue(orderObject);
      console.log('ordengranosForm:', this.ordenGranosForm.value);
    });
  }

  showGranosTab(orderObject) {
    if (orderObject) {
      return orderObject.type === 'Granos' && this.isEdit;
    }
    return true;
  }

  showCarnesTab(orderObject) {
    if (orderObject) {
      return orderObject.type === 'Carnes' && this.isEdit;
    }
    return true;
  }

  

  editOrdenGranos(ordenGranosForm) {
    this.ordenService.edit(this.route + '/' +  this.route1.snapshot.paramMap.get('id') , ordenGranosForm)
      .then(res => {
        this.presentToast('Your data have been saved.');
      }, error => {
        this.presentToast('Error.');
      });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'toast-success'
    });
    toast.present();
  }

  contenedor(array) {
    this.router.navigate(['planilla/' + this.route1.snapshot.paramMap.get('id') + '/contenedor/' + array]);
  }

}
