import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';


import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

import { People } from '../../providers/providers';

import { Item } from '../../models/item';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentPeople: any[];
  nextUrl: string;
  images = [
    "assets/img/speakers/bear.jpg",
    "assets/img/speakers/cheetah.jpg",
    "assets/img/speakers/duck.jpg",
    "assets/img/speakers/eagle.jpg",
    "assets/img/speakers/elephant.jpg",
    "assets/img/speakers/mouse.jpg",
    "assets/img/speakers/puppy.jpg",
    "assets/img/speakers/iguana.jpg",
    "assets/img/speakers/turtle.jpg",
    "assets/img/speakers/rabbit.jpg",
    "assets/img/speakers/lion.jpg",
    "assets/img/speakers/giraffe.jpg",
  ];

  constructor(public navCtrl: NavController, public http: Http, public People: People, public modalCtrl: ModalController) {
    this.People.get().subscribe(
      data => {
        this.currentPeople = this.addPictures(data.results);
        this.nextUrl = data.next;
        console.log(data);
        this.getNextItems().subscribe(
          data => {
            this.currentPeople = this.currentPeople.concat(this.addPictures(data.results));
            this.nextUrl = data.next;
            console.log(data);
          })
      },
      error => console.log(error)
    );
  }

  /**
   * The view loaded, let's query our People for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        //this.People.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of People.
   */
  deleteItem(item) {
    //this.People.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if (this.nextUrl) {
      this.getNextItems()
        .subscribe(
        (data) => {
          this.currentPeople = this.currentPeople.concat(this.addPictures(data.results));
          this.nextUrl = data.next;
          console.log(data);
          infiniteScroll.complete();
        },
        error => { console.log(error); infiniteScroll.complete(); }
        );
    } else {
      infiniteScroll.complete();
    }


  }
  getNextItems() {
    return this.http.get(this.nextUrl)
      .map(resp => resp.json());
  }
  addPictures(data:Array<any>){
    for (let i = 1; i < data.length + 1; i++) {
      data[i - 1].image = this.images[Math.floor(Math.random() * this.images.length)];
    }
    return data;
  }
}
