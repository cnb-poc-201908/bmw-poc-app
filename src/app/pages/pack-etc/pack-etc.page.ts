import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  NavController
} from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-pack-etc',
  templateUrl: './pack-etc.page.html',
  styleUrls: ['./pack-etc.page.scss'],
})
export class PackEtcPage implements OnInit {

  sumprice = 0;
  etcItems = [];
  packageList = [];

  constructor(
    private rest: RestService,
    private store: StoreService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.getPackagelist();
  }

  getPackagelist() {
    this.rest.getPackageList().subscribe(res => {
      if (res && res.code === 200) {
        res.basicInfoList.forEach(element => {
          if (element.RepairTypeCode === 'OTH') {
            element['checked'] = false;
            this.etcItems.push(element);
            this.etcItems.forEach(etc => {
              etc['sumprice'] = 0;
              etc.Laborinfo.forEach(labor => {
                // tslint:disable-next-line:radix
                etc['sumprice'] += parseInt(labor.LaborPrice);
              });
            });
          }
        });
        if (this.store.etcList.length) {
          this.store.etcList.forEach(element => {
            this.etcItems.forEach(etc => {
              if (element.PackageID === etc.PackageID) {
                etc['checked'] = true;
                etc.Laborinfo.forEach(labor => {
                  // tslint:disable-next-line:radix
                  this.sumprice += parseInt(labor.LaborPrice);
                });
              }
            });
          });
        }
        // console.log(this.etcItems, 111);
      }
    });
  }

  sumPrice(item) {
    if (!item.checked) {
      item.Laborinfo.forEach(labor => {
        // tslint:disable-next-line:radix
        this.sumprice += parseInt(labor.LaborPrice);
      });
    } else {
      item.Laborinfo.forEach(labor => {
        // tslint:disable-next-line:radix
        this.sumprice -= parseInt(labor.LaborPrice);
      });
    }
  }

  submit() {
    this.store.etcList = [];
    const etcList = [];
    this.etcItems.forEach(element => {
      if (element.checked) {
        etcList.push(element);
      }
    });
    this.store.etcList = etcList;
    // console.log(this.store.etcList);
    this.navCtrl.navigateBack('/home-results');
  }

}
