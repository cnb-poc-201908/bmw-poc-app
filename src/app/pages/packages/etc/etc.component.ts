import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

@Component({
  selector: 'tab-etc',
  templateUrl: './etc.component.html',
  styleUrls: ['./etc.component.scss']
})
export class EtcComponent implements OnInit {

  etcItems = [
    {text: '加油', value: 200},
    {text: '加油', value: 100}
  ];

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
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
            if (data.text === '' ||  data.value === '') {
              return;
            }
            this.etcItems.push({text: data.text, value: data.value});
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
