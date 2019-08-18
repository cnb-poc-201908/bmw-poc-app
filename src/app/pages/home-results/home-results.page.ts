import { Component, ViewChild } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController, 
  PickerController} from '@ionic/angular';

// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
  public currentTab:string = "maintenance";
  items:any;
  @ViewChild('slidingList') slidingList;
  public objectReceive: any;
  packageAmount:number;
  @ViewChild('datePicker') datePicker;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    // public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public activeRoute: ActivatedRoute,
    private pickerCtrl: PickerController
  ) {
    this.items = [
      {title: 'item1',type:'maintenance',typeName:'保养',details : [
        {label : '全合成机油2L', amount : 2},
        {label : '机油垫片', amount : 1},
        {label : '机油滤芯', amount : 1},
      ]},
      {title: 'item2',type:'check',typeName:'查修',points : [
        {label : '发动机问题1', key : "00001", selected : false},
        {label : '发动机问题2', key : "00002", selected : false},
        {label : '发动机问题3', key : "00003", selected : false},
        {label : '发动机问题4', key : "00004", selected : false},
      ]},
      {title: 'item3',type:'check',typeName:'查修',points : [
        {label : '发动机问题1', key : "00001", selected : false},
        {label : '发动机问题2', key : "00002", selected : false},
        {label : '发动机问题3', key : "00003", selected : false},
        {label : '发动机问题4', key : "00004", selected : false},
      ]},
      {title: 'item4',type:'accident',typeName:'事故'},
      {title: 'item5',type:'etc',typeName:'杂项'},
      {title: 'item6',type:'first',typeName:'首保'},
      {title: 'item7',type:'maintenance',typeName:'保养'},
      {title: 'item8',type:'maintenance',typeName:'保养'},
      {title: 'item9',type:'check',typeName:'查修'},
      {title: 'item10',type:'check',typeName:'查修'}
  ].sort((a,b)=>{
    let typeA = a.type.toUpperCase();
    let typeB = b.type.toUpperCase();
    if (typeA < typeB) {
      return -1;
    }
    if (typeA > typeB) {
      return 1;
    }
    return 0;
  });
  let obj = this.items.reduce((a, c) => (a[c.type] = (a[c.type] || 0) + 1, a), Object.create(null));
  this.packageAmount = Object.keys(obj).length;
  }
  
  back() {
    window.history.back();
  }

  async remove(i) {
    this.items.splice(i, 1);
    await this.slidingList.closeSlidingItems();
    const toast = await this.toastCtrl.create({
      message: '删除成功!',
      duration: 3000,
      position: 'top',
      closeButtonText: '确定',
      showCloseButton: true,
      color:"warning"
    });
    toast.present();
  }

  changeTab(event) {
    this.currentTab = event.detail.value;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.objectReceive = params['object'];
      this.objectReceive = JSON.parse(this.objectReceive);
      console.log(this.objectReceive)
   });
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }
  showPicker(){
    this.datePicker.open();
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
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

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }
  setColorByType(type){
    switch (type) {
      case 'maintenance':
        return {'border-top-color':'#1C69D4'};
      case 'check' :
        return {'border-top-color':'#f65050'};
      case 'accident' :
        return {'border-top-color':'#86888f'};
      case 'etc' :
        return {'border-top-color':'#8290e0'};
      case 'first' :
        return {'border-top-color':'#10dc60'};
      default :
        break;
    }
    return {'border-top-color':''};
  }
}
