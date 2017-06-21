import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Swapi } from './swapi';


@Injectable()
export class People {

  constructor(public http: Http, public api: Swapi) {
  }

  get(params?: any) {
    return this.api.get('people/', params)
      .map(resp => resp.json());
  }


}
