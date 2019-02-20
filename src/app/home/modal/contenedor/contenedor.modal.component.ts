import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpRequestService } from '../../../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contenedor-modal',
  templateUrl: './contenedor.modal.component.html',
  styleUrls: ['contenedor.modal.component.scss'],
})
export class ContenedorModalComponent implements OnInit {
  isEdit: boolean;
  contenedor: {
    romaneo: {
      date: '',
      name: '',
      kgNetosNetos: '',
      kgNetos: '',
      bolsas: '',
      granel: '',
      lote: '',
      },
    precintos: {
      paneos: '',
      aduana: '',
      agencia: '-',
      },
    camiones: {
      chapa: '-',
      bruto: '-',
      tara: '-',
      neto: '-',
      origen: '-',
      }
  };

  contenedorForm: FormGroup;
  errorMessage: string;

  constructor(
    public activeModal: NgbActiveModal,
    private inspectorService: HttpRequestService,
    private fb: FormBuilder,
    public modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.createForm();
    if ( this.isEdit) { this.updateForm(); }
  }

  createForm() {
    this.contenedorForm = this.fb.group({
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
            agencia: '-',
        }),
        camiones: this.fb.group({
            chapa: '-',
            bruto: '-',
            tara: '-',
            neto: '-',
            origen: '-',
        }),
    }),
   console.log('createForm:', this.contenedorForm.value);
  }

  updateForm() {
      this.contenedorForm.setValue({
        romaneo: {
          date: this.contenedor.romaneo.date,
          name: this.contenedor.romaneo.name,
          kgNetosNetos: this.contenedor.romaneo.kgNetosNetos,
          kgNetos: this.contenedor.romaneo.kgNetos,
          bolsas: this.contenedor.romaneo.bolsas,
          granel: this.contenedor.romaneo.granel,
          lote: this.contenedor.romaneo.lote,
          },
        precintos: {
          paneos: this.contenedor.precintos.paneos,
          aduana: this.contenedor.precintos.aduana,
          agencia: this.contenedor.precintos.agencia,
          },
        camiones: {
          chapa: this.contenedor.camiones.chapa,
          bruto: this.contenedor.camiones.bruto,
          tara: this.contenedor.camiones.tara,
          neto: this.contenedor.camiones.neto,
          origen: this.contenedor.camiones.origen,
          }
      });
  }

  addContenedor(inspectorForm) {
          this.activeModal.close(inspectorForm);
          this.contenedorForm.reset();
  }

  editContenedor(inspectorForm) {
    this.activeModal.close(inspectorForm);
          this.contenedorForm.reset();
  }
}

