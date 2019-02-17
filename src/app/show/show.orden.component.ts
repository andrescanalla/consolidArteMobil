import { Component, Input, OnInit } from '@angular/core';

import { HttpRequestService } from '../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';


import { Router, Route, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-show-component',
  templateUrl: './show.orden.component.html',
  styleUrls: ['./show.orden.component.scss']
})
export class ShowOrdenesComponent implements OnInit {
  isEdit: boolean;
  showCarnes = true;
  showGranos = true;

  contactos = [];
  contactos_id = [];
  private route = '/ordenes';
  ordenCarneForm: FormGroup;
  ordenGranosForm: FormGroup;
  public isCollapsedOrdenTrabajo = false;
  public isCollapsedCalidad = true;
  public isCollapsedCertificado = true;
  public isCollapsedFacturacion = true;
  public isCollapsedOtras = true;


  constructor(
    private ordenService: HttpRequestService,
    private router: Router,
    private route1: ActivatedRoute,
    private fb: FormBuilder,

    ) { }

  ngOnInit() {
    const ordenID = this.route1.snapshot.paramMap.get('id');
    if (ordenID) {
      this.updateForm(ordenID);
    }
    this.createForm();
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
      calidad:  Array.of([
        {name : 'Size', val : '3.5MM'},
        {name : 'Moisture', val : '14% MAX'},
        {name : 'Undersize', val : ''},
        {name : 'ForeingMatter', val : ''},
        {name : 'BrokenSkin', val : ''},
        {name : 'OtherDefects', val : ''},
        {name : 'Splits', val : ''},
        {name : 'Stained', val : ''},
        {name : 'FreeLiveInsects', val : ''},
      ]),
      size: [''],
      foreingMatter: [''],
      brokenSkin: [''],
      otherDefects: [''],
      undersize: [''],
      splits: [''],
      stained: [''],
      freeLiveInsects: [''],
      certificate1: ['WEIGHT CERTIFICATE'],
      certificate2: ['CONTAINER CLEANLINESS CERTIFICATE'],
      certificate3: ['QUALITY CERTIFICATE'],
      certificate4: [''],
      billing: [''],
      otherSpecifications1: [''],
      otherSpecifications2: [''],
      otherSpecifications3: [''],
      otherSpecifications4: ['']
   });

   this.ordenCarneForm = this.fb.group({
    name: ['', Validators.required ],
    comment: [''],
    fecha: [''],
    city: [''],
    address: [''],
    contact: [''],
    selectContact: [''],
   });
  }

  showCarnesTab(orderObject) {
    if (orderObject) {
      return orderObject.type === 'Carnes' && this.isEdit;
    }
    return true;
  }

  updateForm(orderId) {
    this.isEdit = true;
    this.ordenService.getById(this.route + '/' + orderId).valueChanges().subscribe(orderObject => {
      this.ordenGranosForm.patchValue(orderObject);
      console.log('dataShow', orderObject);
    });
  }
}

