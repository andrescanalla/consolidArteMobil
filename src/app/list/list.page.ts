import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../services/httpRequest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  ordenGranosForm: any;

  constructor(
    private route1: ActivatedRoute,
    private ordenService: HttpRequestService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
    const ordenID = this.route1.snapshot.paramMap.get('id');
    this.updateForm(ordenID);
  }

  createForm() {
  }

  updateForm(orderId) {
    this.ordenService.getById('/ordenes/' + orderId + '/planilla/contenedores').valueChanges().subscribe(orderObject => {
      this.ordenGranosForm = orderObject;
      console.log('ordengranosForm:', this.ordenGranosForm, 'orderObjet:', orderObject);
    });
  }

  contenedor(array) {
    this.router.navigate(['carga/' + this.route1.snapshot.paramMap.get('id') + '/contenedor/' + array]);
  }

}
