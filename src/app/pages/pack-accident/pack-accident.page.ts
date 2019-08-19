import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
} from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-pack-accident',
  templateUrl: './pack-accident.page.html',
  styleUrls: ['./pack-accident.page.scss'],
})
export class PackAccidentPage implements OnInit {
  [x: string]: any;

  accidentList = [
    { accidentId: '1', accidentRank: null },
    { accidentId: '2', accidentRank: null },
    { accidentId: '3', accidentRank: null },
    { accidentId: '4', accidentRank: null },
    { accidentId: '5', accidentRank: null },
    { accidentId: '6', accidentRank: null },
    { accidentId: '7', accidentRank: null },
    { accidentId: '8', accidentRank: null },
    { accidentId: '9', accidentRank: null },
    { accidentId: '10', accidentRank: null },
    { accidentId: '11', accidentRank: null },
    { accidentId: '12', accidentRank: null },
    { accidentId: '13', accidentRank: null }
  ];
  accidentIndexList = [];
  packageList = [];

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private rest: RestService
  ) { }

  ngOnInit() {
    this.getPaintPackagelist();
  }

  getPaintPackagelist() {
    this.rest.getPaintPackagelist().subscribe(res => {
      if (res && res.code === 200) {
        const packs = res.basicInfoList;
      }
    });
  }

  async selectImg(itemId) {
    const index = this.accidentIndexList.indexOf(itemId);
    const changeLocation = await this.alertCtrl.create({
      header: '确定损伤等级',
      buttons: [
        {
          text: '1级',
          cssClass: this.accidentList[itemId - 1].accidentRank === 1 ? 'pack-accident paint-level-active' : 'pack-accident',
          handler: async (data) => {
            if (this.accidentList[itemId - 1].accidentRank === 1) {
              this.accidentList[itemId - 1].accidentRank = null;
              if (index > -1) {
                this.accidentIndexList.splice(index, 1);
              }
            } else {
              this.accidentList[itemId - 1].accidentRank = 1;
              if (index === -1) {
                this.accidentIndexList.push(itemId);
              }
            }
          }
        },
        {
          text: '2级',
          cssClass: this.accidentList[itemId - 1].accidentRank === 2 ? 'pack-accident paint-level-active' : 'pack-accident',
          handler: async (data) => {
            if (this.accidentList[itemId - 1].accidentRank === 2) {
              this.accidentList[itemId - 1].accidentRank = null;
              if (index > -1) {
                this.accidentIndexList.splice(index, 1);
              }
            } else {
              this.accidentList[itemId - 1].accidentRank = 2;
              if (index === -1) {
                this.accidentIndexList.push(itemId);
              }
            }
          }
        },
        {
          text: '3级',
          cssClass: this.accidentList[itemId - 1].accidentRank === 3 ? 'pack-accident paint-level-active' : 'pack-accident',
          handler: async (data) => {
            if (this.accidentList[itemId - 1].accidentRank === 3) {
              this.accidentList[itemId - 1].accidentRank = null;
              if (index > -1) {
                this.accidentIndexList.splice(index, 1);
              }
            } else {
              this.accidentList[itemId - 1].accidentRank = 3;
              if (index === -1) {
                this.accidentIndexList.push(itemId);
              }
            }
          }
        }
      ]
    });
    changeLocation.present();
  }

  submit() {
    this.packageList = [];
    this.accidentList.forEach(element => {
      if (element.accidentRank !== null) {
        this.packageList.push(element);
      }
    });
    console.log(this.packageList);
  }

}
