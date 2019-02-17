import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Injectable()

export class HttpRequestService {

  listRef: AngularFireObject<any>;
  list: Observable<any>;
  constructor(
    public db: AngularFireDatabase
  ) {
    this.listRef = null;
    this.list = null;
  }

  private getRef(modelRef) {
    return this.db.list(modelRef);
  }

  getAll(model) {
    return this.getRef(model);
  }

  getFillter(apiEndpoint, filtro, campo) {
    
  }

  getById(model) {
    return this.db.object(model);
  }

  create(model, createRequest) {
   return this.getRef(model).push(createRequest);
  }

  edit(model,  editRequest) {
   return  this.db.object(model).update(editRequest);
  }

  delete(model, deletRequest) {
   return  this.getRef(model).remove(deletRequest.key);
  }
}
