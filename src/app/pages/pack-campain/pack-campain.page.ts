import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';
import { StoreService } from 'src/app/services/store.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-pack-campain',
  templateUrl: './pack-campain.page.html',
  styleUrls: ['./pack-campain.page.scss'],
})
export class PackCampainPage implements OnInit {

  public packages: Array<{}> = [
    {
      'AccountID': 'C0000001',
      'RepairTypeCode': 'CAM',
      'PackageName': '夏日优惠：更换雨刮片',
      'PackagePrice': '',
      'RepairType': '活动',
      'Magic': '44',
      'Model': '',
      'Laborinfo': [
        {
          'LaborStatus': 'F',
          'LaborUnitPrice': '40.00',
          'LaborCode': '6161541',
          'LaborAmount': '1',
          'LaborDescription': '更换两个雨刷片',
          'LaborPrice': '40'
        }
      ],
      'PartInfo': [
        {
          'PartsAmount': '1.00',
          'PartsCode': '61610427668',
          'PartsName': '雨刮片组件',
          'Partstatus': 'F',
          'PartPrice': '300.00'
        }
      ],
      'PackageID': 'SUMMER01',
      'CHECKType': '',
      'Engine': ''
    },
    {
      'AccountID': 'W0000011',
      'RepairTypeCode': 'PDI',
      'PackageName': 'PDI检查',
      'PackagePrice': '',
      'RepairType': 'PDI',
      'Magic': '45',
      'Model': '',
      'Laborinfo': [
        {
          'LaborStatus': 'F',
          'LaborUnitPrice': '40.00',
          'LaborCode': '0000741',
          'LaborAmount': '1',
          'LaborDescription': '弹簧锁止器移交检验',
          'LaborPrice': '40'
        },
        {
          'LaborStatus': 'F',
          'LaborUnitPrice': '40.00',
          'LaborCode': '0000556',
          'LaborAmount': '2',
          'LaborDescription': '进行车辆测试',
          'LaborPrice': '80'
        }
      ],
      'PartInfo': [],
      'PackageID': 'PDI01',
      'CHECKType': '',
      'Engine': ''
    },
    {
      'AccountID': 'W0000011',
      'RepairTypeCode': 'CAM',
      'PackageName': '车载电脑升级',
      'PackagePrice': '',
      'RepairType': '活动',
      'Magic': '46',
      'Model': '',
      'Laborinfo': [
        {
          'LaborStatus': 'F',
          'LaborUnitPrice': '40.00',
          'LaborCode': '6614890',
          'LaborAmount': '10',
          'LaborDescription': '车载电脑升级',
          'LaborPrice': '400'
        }
      ],
      'PartInfo': [],
      'PackageID': 'T201901',
      'CHECKType': '',
      'Engine': ''
    }
  ];

  public parmVN: string;

  public packagesOfCampain: Array<{}> = [];

  public selectedPackages: Array<{}> = [];

  public selectedAmount: any = 0;

  public selectedHours: Number = 0;

  public campainNumbers: Array<{}> = [];

  public campainList: Array<{}> = [{
    'CAMPAIGN': 'V201907',
    'Type': 'V',
    'CAMPDESC': '免费进行两个雨刷片更换',
    'CAMPACNO': 'SUMMER01',
    'CAMPACKNAME': '夏日优惠：更换雨刮片',
    'START': ' 2019/07/01',
    'EXPIRE': ' 2019/09/31',
    'EDDATE': ' 2019/06/30'
  },
  {
    'CAMPAIGN': 'T201908',
    'Type': 'V',
    'CAMPDESC': '免费进行ECU升级',
    'CAMPACNO': 'T201901',
    'CAMPACKNAME': '车载电脑升级',
    'START': ' 2019/07/01',
    'EXPIRE': ' 2019/09/31',
    'EDDATE': ' 2019/06/30'
  }
];


  constructor(public activeRoute: ActivatedRoute, private store: StoreService, public navCtrl: NavController) { }

  getCampainNoByVn(vn) {
    this.campainNumbers = this.store.campainListOfVehicle.filter((item) => {
      return item['KEY'] === vn;
    });
  }

  getCapainPackage() {
    this.packagesOfCampain.splice(0, this.packagesOfCampain.length);
    this.getCampainNoByVn(this.parmVN);
    this.campainNumbers.forEach((campainNO) => {
      this.campainList.filter((item) => {
        if (item['CAMPAIGN'] === campainNO['CAMPCD']) {
          this.packages.filter((packageitem) => {
            if ( packageitem['PackageID'] === item['CAMPACNO'] ) {
              const JsonCampain = {
                'campacno': item['CAMPACNO'],
                'packageid': packageitem['PackageID'],
                'campainDetail': item,
                'packageDetail': packageitem
              };
              this.packagesOfCampain.push(JsonCampain);
            }
            return packageitem['PackageID'] === item['CAMPACNO'];
          });
        }
        return item['CAMPAIGN'] === campainNO['CAMPCD'];
      });
    });
  }

  reformatPackage() {
    this.packages.forEach(item => {
      let totalPartPrice = 0;
      let totalLaborPrice = 0;
      let totalLaborHours = 0;
      if (item['PartInfo'] && item['PartInfo'].length > 0) {
        item['PartInfo'].forEach( part => {
          part['PartPrice'] = part['PartPrice'] !== '' ? Number(part['PartPrice']) : 0;
          totalPartPrice = totalPartPrice + part['PartPrice'];
        });
      }
      if (item['Laborinfo'] && item['Laborinfo'].length > 0) {
        item['Laborinfo'].forEach( part => {
          part['LaborPrice'] = part['LaborPrice'] !== '' ? Number(part['LaborPrice']) : 0;
          totalLaborPrice = totalLaborPrice + part['LaborPrice'];
          totalLaborHours = totalLaborHours  + Number(part['LaborAmount']);
        });
      }
      item['totalPartPrice'] = totalPartPrice;
      item['totalLaborPrice'] = totalLaborPrice;
      item['totalLaborHours'] = totalLaborHours;
      item['totalPrice'] = totalPartPrice + totalLaborPrice;
      item['selected'] = false;
    });
  }

  ngOnInit() {
    if (this.store.compainList.length > 0) {
      this.packagesOfCampain.splice(0, this.packagesOfCampain.length);
      this.packagesOfCampain = JSON.parse(localStorage.getItem('packagesOfCampain'));
      this.store.compainList.forEach((item) => {
        this.packagesOfCampain.forEach(element => {
          if (element['packageid'] === item['PackageID']) {
            element['packageDetail']['selected'] = true;
            this.select(element);
          }
        });
      });
    } else {
      this.reformatPackage();
      this.activeRoute.queryParams.subscribe((params: Params) => {
        this.parmVN = params['parmVN'];
        this.getCapainPackage();
        localStorage.setItem('packagesOfCampain', JSON.stringify(this.packagesOfCampain));
      });
    }
  }

  doClick(item) {
    item.packageDetail.selected = !item.packageDetail.selected;
  }

  select(pack) {
    let hours = 0;
    if (pack.packageDetail.selected) {
      this.selectedPackages.push(pack['packageDetail']);
    } else {
      this.selectedPackages.splice(this.selectedPackages.findIndex( item => item['PackageID'] === pack.packageid), 1);
    }

    if (this.selectedPackages.length > 0)  {
      this.selectedPackages.forEach(item => {
        hours = hours + item['totalLaborHours'];
      });
      this.selectedHours = hours;
    } else {
      this.selectedHours = 0;
    }

    this.selectedAmount = this.selectedPackages.length;
  }

  submitToHomeResults() {
    this.store.compainList = this.selectedPackages;
    this.navCtrl.navigateBack('/home-results');
  }

}
