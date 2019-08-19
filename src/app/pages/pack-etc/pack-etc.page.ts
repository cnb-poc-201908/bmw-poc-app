import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController
} from '@ionic/angular';

@Component({
  selector: 'app-pack-etc',
  templateUrl: './pack-etc.page.html',
  styleUrls: ['./pack-etc.page.scss'],
})
export class PackEtcPage implements OnInit {

  currentTab = 'cost';
  costItems = [];
  outItems = [];

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

  changeTab(event) {
    this.currentTab = event.detail.value;
  }

  async reservationEtc(item) {
    const changeLocation = await this.alertCtrl.create({
      header: item,
      inputs: [
        {
          name: 'value',
          placeholder: '金额',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: '保存',
          handler: async (data) => {
            if (data.value === '') {
              return;
            }
            this[this.currentTab + 'Items'].push({ text: item, value: data.value });
          }
        }
      ]
    });
    changeLocation.present();
  }

  async addItem() {
    const changeLocation = await this.alertCtrl.create({
      header: '自定义费用',
      inputs: [
        {
          name: 'text',
          placeholder: '自定义项目',
          type: 'text'
        },
        {
          name: 'value',
          placeholder: '金额',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: '保存',
          handler: async (data) => {
            if (data.text === '' || data.value === '') {
              return;
            }
            this[this.currentTab + 'Items'].push({ text: data.text, value: data.value });
          }
        }
      ]
    });
    changeLocation.present();
  }

  async reservationEtcEdit(item) {
    const changeLocation = await this.alertCtrl.create({
      header: item.text,
      inputs: [
        {
          name: 'value',
          placeholder: '金额',
          type: 'number',
          value: item.value
        }
      ],
      buttons: [
        {
          text: '保存',
          handler: async (data) => {
            item.value = data.value;
          }
        }
      ]
    });
    changeLocation.present();
  }

}
