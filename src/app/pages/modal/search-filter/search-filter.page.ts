import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {
  public radiusmiles = 1;
  public minmaxprice = {
    upper: 500,
    lower: 10
  };

  public objectReceive: any;

  constructor(private modalCtrl: ModalController, public activeRoute: ActivatedRoute) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ionViewDidEnter(){
    this.activeRoute.queryParams.subscribe((params: Params) => {
       this.objectReceive = params['object'];
       this.objectReceive = JSON.parse(this.objectReceive);
       console.log(this.objectReceive)
    });
 }
}
