import { Component, ViewChild, OnInit } from '@angular/core';
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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
  public currentTab:string = "maintenance";
  packages:Array<any>;
  @ViewChild('slidingList') slidingList;
  public objectReceive: any;
  packageAmount:number;
  private isInit:boolean = false;
  camCount:number;

  @ViewChild('datePicker') datePicker;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    // public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public activeRoute: ActivatedRoute,
    private pickerCtrl: PickerController,
    public store: StoreService,
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    public router: Router
  ) {
  }

  async remove(i) {
    this.packages.splice(i, 1);
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

  forward(target) {
    this.navCtrl.navigateForward(target);
  }
  getPackagePrice(p:any){
    let laborPrice = p.Laborinfo.reduce((a,b) => a + parseFloat(b.LaborPrice?b.LaborPrice:'0'), 0);
    let partPrice = p.PartInfo.reduce((a,b) => a + parseFloat(b.PartPrice?b.PartPrice:'0'), 0);
    return laborPrice+partPrice;
  }
  getAllLaborAmount(){
    return this.packages.reduce((a,b)=>(a + b.Laborinfo.reduce((c,d) => c + parseFloat(d.LaborAmount?d.LaborAmount:'0'),0)),0) / 12;
  }
  ionViewDidEnter(){
    this.isInit = true;
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.objectReceive = params['object'];
      this.objectReceive = JSON.parse(this.objectReceive);
      // console.log(this.objectReceive)
   });
   //back to home page, refresh data
   if(this.isInit){
    this.init();
   }
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
      case 'MA':
        return '#1C69D4';
      case 'CHE' :
        return '#f65050';
      case 'INC' :
        return '#86888f';
      case 'OTH' :
        return '#8290e0';
      case 'FMA' :
        return '#10dc60';
      case 'CAM' :
        return '#e0b500';
      case 'PDI' :
        return '#10dc60';
      case 'TXT' :
        return '#d12765';
      default :
        break;
    }
    return '#110A3B';
  }

  ngOnInit() {
    this.init();
  }
  init(){
    this.packages = [...this.store.maintenanceList,...this.store.compainList,...this.store.accidentList,...this.store.etcList].sort((a,b)=>{
      let typeA = a.RepairTypeCode.toUpperCase();
      let typeB = b.RepairTypeCode.toUpperCase();
      if (typeA < typeB) {
        return -1;
      }
      if (typeA > typeB) {
        return 1;
      }
      return 0;
    });
    let obj = this.packages.reduce((a, c) => (a[c.RepairTypeCode] = (a[c.RepairTypeCode] || 0) + 1, a), Object.create(null));
    this.packageAmount = Object.keys(obj).length;
    this.camCount = this.store.campainListOfVehicle.filter((cam:any)=>cam.KEY===this.store.customer.virecle_info.CHASSIS).length;
  }
  doClick(pack){
    pack.expand = !pack.expand;
  }
  removePartItem(packIndex,itemIndex){
    this.packages[packIndex].PartInfo.splice(itemIndex,1);
    if(this.packages[packIndex].PartInfo.length<1 && this.packages[packIndex].Laborinfo.length<1){console.log(packIndex,itemIndex);
      this.remove(packIndex);
    }
  }
  removeLaborItem(packIndex,itemIndex){
    this.packages[packIndex].Laborinfo.splice(itemIndex,1);
    if(this.packages[packIndex].Laborinfo.length<1 && this.packages[packIndex].PartInfo.length<1){console.log(packIndex,itemIndex);
      this.remove(packIndex);
    }
  }
  goNotification(){
    this.router.navigate(['pack-campain'], {
      queryParams: {
        parmVN: this.store.customer.virecle_info.CHASSIS
      }
  });
  }
  async save(){
    const toast = await this.toastCtrl.create({
      message: '保存成功!',
      duration: 3000,
      position: 'top',
      closeButtonText: '确定',
      showCloseButton: true,
      color:"success"
    });
    toast.present();
  }
  async comingsoon(){
    const toast = await this.toastCtrl.create({
      message: 'Coming Soon!',
      duration: 3000,
      position: 'top',
      closeButtonText: '确定',
      showCloseButton: true,
      color:"light"
    });
    toast.present();
  }
}
