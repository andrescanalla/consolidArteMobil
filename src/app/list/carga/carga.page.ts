import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-carga',
  templateUrl: 'carga.page.html',
  styleUrls: ['carga.page.scss'],
})
export class CargaPage implements OnInit {
    private route = '/ordenes';
    contenedorForm: FormGroup;
    arrayID: string;
    ordenID: string;
    public isCollapsedControl = true;
    public isCollapsedPre = true;
    public isCollapsedCa = true;
    public isCollapsedDa = true;

    constructor(
        private route1: ActivatedRoute,
        private ordenService: HttpRequestService,
        private fb: FormBuilder,
        public toastController: ToastController,
        public location: Location
      ) {
            console.log('dsfds');

        }
      ngOnInit() {
        this.createForm();
        this.ordenID = this.route1.snapshot.paramMap.get('id');
        this.arrayID = this.route1.snapshot.paramMap.get('array');
        this.updateForm();
        console.log('Contenedor', this.contenedorForm.value, 'array', this.arrayID, 'id', this.ordenID);
      }

      createForm() {
        this.contenedorForm = this.fb.group({
            romaneo:  this.fb.group({
                date: null,
                name: null,
                kgNetosNetos: null,
                kgNetos: null,
                bolsas: null,
                granel: null,
                lote: null,
                }),
            precintos: this.fb.group( {
                paneos: null,
                aduana: null,
                agencia: null,
                }),
            camiones: this.fb.group( {
                chapa: null,
                bruto: null,
                tara: null,
                neto: null,
                origen: null,
            }),
        });
      }

      updateForm() {
        this.ordenService.getById(
            this.route + '/' + this.ordenID + '/planilla/contenedores/' + this.arrayID
        ).valueChanges().subscribe(orderObject => {
        console.log('resultado:', orderObject);
        this.contenedorForm.patchValue(orderObject);
        });
      }

      goBack() {
        this.location.back();
        console.log('aaaaa', this.contenedorForm.value);
      }

      editContenedor(contenedorForm) {
        this.ordenService.edit(
            this.route + '/' +  this.route1.snapshot.paramMap.get('id')  + '/planilla/contenedores/' + this.arrayID , contenedorForm
        ).then(res => {
            this.presentToast('Your data have been saved.');
            this.goBack();
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
}
