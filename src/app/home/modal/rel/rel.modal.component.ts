import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpRequestService } from '../../../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-rel-modal',
  templateUrl: './rel.modal.component.html'
})
export class RelModalComponent implements OnInit {
  isEdit: boolean;
  rel: {
    date: '',
    hour: '',
    descripcion: '',
  };
  relForm: FormGroup;
  errorMessage: string;

  constructor(
    public activeModal: NgbActiveModal,
    private relService: HttpRequestService,
    private fb: FormBuilder,
    public modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.createForm();
    if ( this.isEdit) { this.updateForm(); }
  }

  createForm() {
    this.relForm = this.fb.group({
      date: ['', Validators.required ],
      hour: [''],
      descripcion: ['']
   });
   console.log('createForm:', this.relForm.value);
  }

  updateForm() {
      this.relForm.setValue({
      date: this.rel.date,
      hour: this.rel.hour,
      descripcion: this.rel.descripcion
    });
  }

  addRel(relForm) {
          this.activeModal.close(relForm);
          this.relForm.reset();
  }

  editRel(relForm) {
    this.activeModal.close(relForm);
          this.relForm.reset();
  }
}

