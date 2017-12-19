import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

/*
  Generated class for the SharedServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SharedServiceProvider Provider');
  }
  private emitChangeSource= new Subject<any>();

  changeEmitted$= this.emitChangeSource.asObservable();


  emitChange(change :any){
    this.emitChangeSource.next(change);
  }

}
