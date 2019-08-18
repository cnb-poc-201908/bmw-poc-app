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
  costItems = [
    { text: '费用类1', value: 200 },
    { text: '费用类2', value: 100 }
  ];
  outItems = [
    { text: '外包1', value: 200 },
    { text: '外包2', value: 100 }
  ];

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  changeTab(event) {
    this.currentTab = event.detail.value;
  }

  async addItem() {
    const changeLocation = await this.alertCtrl.create({
      header: '添加条目',
      // message: 'Type your Address.',
      inputs: [
        {
          name: 'text',
          placeholder: '名称',
          type: 'text'
        },
        {
          name: 'value',
          placeholder: '费用',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: async (data) => {
            // console.log('Change clicked', data);
            if (data.text === '' || data.value === '') {
              return;
            }
            this[this.currentTab + 'Items'].push({ text: data.text, value: data.value });
            const toast = await this.toastCtrl.create({
              message: '添加成功！',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

}
