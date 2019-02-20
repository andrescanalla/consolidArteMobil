import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpRequestService } from '../../../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-muestras-modal',
  templateUrl: './muestras.modal.component.html'
})
export class MuestrasModalComponent implements OnInit {
  isEdit: boolean;
  muestras: {
    tipo: '',
    cantArchivo: '',
    precintoArchivo: '',
    cantCliente: '',
    precintoCliente: '',
    cantOtros: '',
    precintoOtros: '',
  };
  muestrasForm: FormGroup;
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
    this.muestrasForm = this.fb.group({
      tipo: ['', Validators.required ],
      cantArchivo: [''],
      precintoArchivo: [''],
      cantCliente: [''],
      precintoCliente: [''],
      cantOtros: [''],
      precintoOtros: ['']
   });
   console.log('createForm:', this.muestrasForm.value);
  }

  updateForm() {
      this.muestrasForm.setValue({
      tipo: this.muestras.tipo,
      cantArchivo: this.muestras.cantArchivo,
      precintoArchivo: this.muestras.precintoArchivo,
      cantCliente: this.muestras.cantCliente,
      precintoCliente: this.muestras.precintoCliente,
      cantOtros: this.muestras.cantOtros,
      precintoOtros: this.muestras.precintoOtros
    });
  }

  addMuestras(muestrasForm) {
          this.activeModal.close(muestrasForm);
          this.muestrasForm.reset();
  }

  editMuestras(muestrasForm) {
    this.activeModal.close(muestrasForm);
          this.muestrasForm.reset();
  }
}

