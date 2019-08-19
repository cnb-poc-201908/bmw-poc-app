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
      'Magic': '2',
      'PackageID': 'SUMMER01',
      'PackageName': '夏日优惠：更换雨刮片',
      'AccountID': 'C0000001',
      'RepairType': '一般维修',
      'RepairTypeCode': 'NOR',
      'Laborinfo': [
        {
          'LaborCode': '6161541',
          'LaborDescription': '更换两个雨刷片',
          'LaborAmount': '1.00',
          'LaborPrice': '50.00'
        }
      ],
      'PartInfo': [
        {
          'Magic': '4',
          'PartsCode': '61610427668',
          'PartsName': '雨刮片组件',
          'PartsAmount': '1.00',
          'PartPrice': '210.00'
        },
        {
          'PartsCode': '83210398511',
          'PartsName': '发动机机油 5W30',
          'PartsAmount': '4.25',
          'PartPrice': '200.0'
        }
      ],
      'Campaign1': 'V201908',
      'Model': 'E60',
      'Engine': 'D60'
    },
    {
      'Magic': '11',
      'PackageID': 'T201901',
      'PackageName': '车载电脑升级',
      'AccountID': 'W0000011',
      'RepairType': '活动',
      'RepairTypeCode': 'CAM',
      'Laborinfo': [
        {
          'LaborCode': '6614890',
          'LaborDescription': '车载电脑升级',
          'LaborAmount': '10.00',
          'LaborPrice': '500.00'
        }
      ],
      'PartInfo': [],
      'Campaign1': 'T201901',
      'Model': 'E46',
      'Engine': 'N46'
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

  public campainListOfVehicle: Array<{}> = [{
    'CAMPCD': 'V201907',
    'CAMPTYPE': 'V',
    'KEY': 'LBV8W3103KMN09672',
    'MAGIC': '',
    'STATUS': 'O',
    'EDDATE': ' 2019/08/01'
  },
  {
    'CAMPCD': 'T201908',
    'CAMPTYPE': 'V',
    'KEY': 'LBV8W3103KMN09672',
    'MAGIC': '',
    'STATUS': 'O',
    'EDDATE': ' 2019/08/01'
  },
  {
    'CAMPCD': 'V201907',
    'CAMPTYPE': 'V',
    'KEY': 'WBAPG510XBA846572',
    'MAGIC': '',
    'STATUS': 'O',
    'EDDATE': ' 2019/08/01'
  },
  {
    'CAMPCD': 'V201907',
    'CAMPTYPE': 'V',
    'KEY': 'LBV3M2108EMC54311',
    'MAGIC': '',
    'STATUS': 'O',
    'EDDATE': ' 2019/08/01'
  },
  {
    'CAMPCD': 'T201908',
    'CAMPTYPE': 'V',
    'KEY': 'LBV8A1406JMM11509',
    'MAGIC': '',
    'STATUS': 'O',
    'EDDATE': ' 2019/08/01'
  }
];

  constructor(public activeRoute: ActivatedRoute, private store: StoreService, public navCtrl: NavController) { }

  getCampainNoByVn(vn) {
    this.campainNumbers = this.campainListOfVehicle.filter((item) => {
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
