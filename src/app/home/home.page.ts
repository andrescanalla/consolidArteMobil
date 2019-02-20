import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RelModalComponent } from './modal/rel/rel.modal.component';
import { MuestrasModalComponent } from './modal/muestras/muestras.modal.component';
import { ContenedorModalComponent } from './modal/contenedor/contenedor.modal.component';

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
    public modalService: NgbModal,

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

  openContenedor(ordenGranosForm) {
    this.modalService.open(ContenedorModalComponent, {  size: 'lg'}).result.then(
      (dataContenedor) => {
        console.log('dataContenedor', dataContenedor, this.ordenGranosForm.value.planilla.contenedores);
        if (this.ordenGranosForm.value.planilla.contenedores.length > 0) {
          this.ordenGranosForm.value.planilla.contenedores.push(dataContenedor);
          console.log('pushea');
        } else {
          this.ordenGranosForm.value.planilla.contenedores = [dataContenedor];
          console.log('crea', ordenGranosForm.planilla.contenedores);
        }
        this.ordenService.edit(
          this.route + '/' +  this.route1.snapshot.paramMap.get('id') + '/planilla/contenedores',
          ordenGranosForm.planilla.contenedores)
        .then(res => {
          this.presentToast('Contenedor Successfully Added!');
        }, error => {
          this.presentToast('Error adding Contenedor');
        });
      },
      (error) => { console.log('error:', error); }
    );
  }

  openRel(ordenGranosForm) {
    this.modalService.open(RelModalComponent, { }).result.then(
      (dataRel) => {
        console.log('dataInspector', dataRel);
        if (this.ordenGranosForm.value.planilla.timeLog.length > 0 ) {
        this.ordenGranosForm.value.planilla.timeLog.push(dataRel);
        } else {
          this.ordenGranosForm.value.planilla.timeLog = [dataRel];
        }
        this.ordenService.edit(this.route + '/' +  this.route1.snapshot.paramMap.get('id') + '/planilla/timeLog' ,
        ordenGranosForm.planilla.timeLog)
      .then(res => {
        this.presentToast('Time Log Successfully Added!');
      }, error => {
        this.presentToast('Error adding Time Log');
      });
      },
      (error) => { console.log('error:', error); }
    );
  }

  openMuestras(ordenGranosForm) {
    this.modalService.open(MuestrasModalComponent, { }).result.then(
      (dataRel) => {
        console.log('dataInspector', dataRel);
        if (this.ordenGranosForm.value.planilla.muestras.length > 0 ) {
        this.ordenGranosForm.value.planilla.muestras.push(dataRel);
        } else {
          this.ordenGranosForm.value.planilla.muestras = [dataRel];
        }
        this.ordenService.editArray(this.route + '/' +  this.route1.snapshot.paramMap.get('id') + '/planilla/muestras' ,
        ordenGranosForm.planilla.muestras)
      .then(res => {
        this.presentToast('Muestras Successfully Added!');
      }, error => {
        this.presentToast('Error adding Muestras');
      });
      },
      (error) => { console.log('error:', error); }
    );
  }

  editRel(myIndex, ordenGranosForm) {
    const modalRef = this.modalService.open(RelModalComponent, { });
    modalRef.componentInstance.rel = Object.assign( {}, ordenGranosForm.value.planilla.timeLog[myIndex]);
    console.log('as', ordenGranosForm.value.planilla.timeLog[myIndex]);
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(
      (result) => {
        this.ordenGranosForm.value.planilla.timeLog[myIndex] = result;
        this.ordenService.editArray(this.route + '/' +  this.route1.snapshot.paramMap.get('id') + '/planilla/timeLog',
        ordenGranosForm.value.planilla.timeLog)
        .then(res => {
          this.presentToast('Time Log Successfully Edited!');
        }, error => {
          this.presentToast('Error edited Time Log');
        });
      },
      (cancel) => { console.log(cancel); });
  }

  editMuestras(myIndex, ordenGranosForm) {
    const modalRef = this.modalService.open(MuestrasModalComponent, { size: 'lg' });
    modalRef.componentInstance.muestras = Object.assign( {}, ordenGranosForm.value.planilla.muestras[myIndex]);
    console.log('as', ordenGranosForm.value.planilla.muestras[myIndex]);
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(
      (result) => {
        this.ordenGranosForm.value.planilla.muestras[myIndex] = result;
        this.ordenService.editArray(this.route + '/' +  this.route1.snapshot.paramMap.get('id') + '/planilla/muestras',
        ordenGranosForm.value.planilla.muestras)
        .then(res => {
          this.presentToast('Muestra Successfully Edited!');
        }, error => {
          this.presentToast('Error edited Muestra');
        });
      },
      (cancel) => { console.log(cancel); });
  }

  deleteRel(myIndex) {
    this.ordenGranosForm.value.planilla.timeLog.splice(myIndex, 1);
    this.ordenService.editArray(this.route + '/' +  this.route1.snapshot.paramMap.get('id') + '/planilla/timeLog',
    this.ordenGranosForm.value.planilla.timeLog)
        .then(res => {
          this.presentToast('Rel Horaria Eliminado con Exito!');
        }, error => {
          this.presentToast('Error al Eliminar Rel Horaria');
        });
  }

  deleteMuestras(myIndex) {
    this.ordenGranosForm.value.planilla.muestras.splice(myIndex, 1);
    this.ordenService.editArray(this.route + '/' +  this.route1.snapshot.paramMap.get('id') + '/planilla/muestras',
    this.ordenGranosForm.value.planilla.muestras)
        .then(res => {
          this.presentToast('Muestra Eliminada con Exito!');
        }, error => {
          this.presentToast('Error al Eliminar la Muestra');
        });
  }

}
