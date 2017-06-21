import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


import { Items } from '../../providers/providers';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController, public http: Http, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
    this.getFilms().subscribe(results => {
      this.item.filmInfo = results;
    });
  }
  getFilms() {
    var requestArray = []
    for (var index = 0; index < this.item.films.length; index++) {
      requestArray.push(this.http.get(this.item.films[index]).map(resp => resp.json()));

    }
    return Observable.forkJoin(requestArray);

  }

}
