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

  async remove(pack) {
    this.removePackage(pack);
    this.init();
    await this.slidingList.closeSlidingItems();
    const toast = await this.toastCtrl.create({
      message: '删除成功!',
      duration: 1000,
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
    let laborPrice = p.Laborinfo.reduce((a,b) => a + parseFloat((b.LaborPrice && b.LaborSelected==true)?b.LaborPrice:'0'), 0);
    let partPrice = p.PartInfo.reduce((a,b) => a + parseFloat((b.PartPrice && b.PartSelected==true)?b.PartPrice:'0'), 0);
    if(p.RepairTypeCode==="CHE"){
      return p.Laborinfo[0].LaborAmount * parseFloat(p.Laborinfo[0].LaborUnitPrice?p.Laborinfo[0].LaborUnitPrice:'0');
    }
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
    this.packages = [...this.store.maintenanceList,...this.store.compainList,...this.store.accidentList,...this.store.etcList,...this.store.checkList].sort((a,b)=>{
      let typeA = a.RepairTypeCode.toUpperCase();
      let typeB = b.RepairTypeCode.toUpperCase();
      if (typeA < typeB) {
        return -1;
      }
      if (typeA > typeB) {
        return 1;
      }
      return 0;
    });console.log(this.packages);
    let obj = this.packages.reduce((a, c) => (a[c.RepairTypeCode] = (a[c.RepairTypeCode] || 0) + 1, a), Object.create(null));
    this.packageAmount = Object.keys(obj).length;
    this.camCount = this.store.campainListOfVehicle.filter((cam:any)=>cam.KEY===this.store.customer.virecle_info.CHASSIS).length;
  }
  doClick(pack){
    pack.expand = !pack.expand;
  }
  removePartItem(pack,itemIndex){
    this.removeMAPart(pack,itemIndex);
    this.removeCAMPart(pack,itemIndex)
    this.init();
  }
  removeLaborItem(pack,itemIndex){
    this.removeMALabor(pack,itemIndex);
    this.removeOTHLabor(pack,itemIndex);
    this.removeCAMLabor(pack,itemIndex);
    this.removeINCLabor(pack,itemIndex)
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
      duration: 1000,
      position: 'top',
      closeButtonText: '确定',
      showCloseButton: true,
      color:"success"
    });
    toast.present();
  }
  async comingsoon(){
    const toast = await this.toastCtrl.create({
      message: '功能正在开发中!',
      duration: 1000,
      position: 'top',
      closeButtonText: '确定',
      showCloseButton: true,
      color:"light"
    });
    toast.present();
  }

  private deletePackage(storeName,pack){
    let index = this.store[storeName].findIndex(m=>m.PackageID===pack.PackageID);
    if(index>-1){
      this.store[storeName].splice(index,1);
    }
  }
  private removeMAPart(pack,itemIndex){
    let index = this.store.maintenanceList.findIndex(m=>m.PackageID===pack.PackageID);
    if(index>-1){
      this.store.maintenanceList[index].PartInfo[itemIndex].PartSelected = false;
      if(this.store.maintenanceList[index].PartInfo.filter(p=>p.PartSelected==true).length<1 && this.store.maintenanceList[index].Laborinfo.filter(l=>l.LaborSelected==true).length<1){
        this.remove(pack);
      }
    }
  }
  private removeMALabor(pack,itemIndex){
    let index = this.store.maintenanceList.findIndex(m=>m.PackageID===pack.PackageID);
    if(index>-1){
      this.store.maintenanceList[index].Laborinfo[itemIndex].LaborSelected = false;
      if(this.store.maintenanceList[index].Laborinfo.filter(p=>p.LaborSelected==true).length<1 && this.store.maintenanceList[index].PartInfo.filter(l=>l.PartSelected==true).length<1){
        this.remove(pack);
      }
    }
  }
  private removeOTHLabor(pack,itemIndex){
    let index = this.store.etcList.findIndex(m=>m.PackageID===pack.PackageID);
    if(index>-1){
      this.store.etcList[index].Laborinfo[itemIndex].LaborSelected = false;
      if(this.store.etcList[index].Laborinfo.filter(p=>p.LaborSelected==true).length<1 && this.store.etcList[index].PartInfo.filter(l=>l.PartSelected==true).length<1){
        this.remove(pack);
      }
    }
  }
  private removeCAMPart(pack,itemIndex){
    let index = this.store.compainList.findIndex(m=>m.PackageID===pack.PackageID);
    if(index>-1){
      this.store.compainList[index].PartInfo[itemIndex].PartSelected = false;
      if(this.store.compainList[index].PartInfo.filter(p=>p.PartSelected==true).length<1 && this.store.compainList[index].Laborinfo.filter(l=>l.LaborSelected==true).length<1){
        this.remove(pack);
      }
    }
  }
  private removeCAMLabor(pack,itemIndex){
    let index = this.store.compainList.findIndex(m=>m.PackageID===pack.PackageID);
    if(index>-1){
      this.store.compainList[index].Laborinfo[itemIndex].LaborSelected = false;
      if(this.store.compainList[index].Laborinfo.filter(p=>p.LaborSelected==true).length<1 && this.store.compainList[index].PartInfo.filter(l=>l.PartSelected==true).length<1){
        this.remove(pack);
      }
    }
  }
  private removeINCLabor(pack,itemIndex){
    let index = this.store.accidentList.findIndex(m=>m.PackageID===pack.PackageID);
    if(index>-1){
      this.store.accidentList[index].Laborinfo[itemIndex].LaborSelected = false;
      if(this.store.accidentList[index].Laborinfo.filter(p=>p.LaborSelected==true).length<1 && this.store.accidentList[index].PartInfo.filter(l=>l.PartSelected==true).length<1){
        this.remove(pack);
      }
    }
  }
  removePackage(pack){
    // this.removeMA(pack);
    // this.removeCHE(pack);
    // this.removeINC(pack);
    // this.removeOTH(pack);
    // this.removeCAM(pack);
    this.deletePackage('maintenanceList',pack);
    this.deletePackage('checkList',pack);
    this.deletePackage('accidentList',pack);
    this.deletePackage('etcList',pack);
    this.deletePackage('compainList',pack);
  }
}
