import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';


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
    'CAMPDESC': '免费进行夏日雨刮器检查，如需更换，可以免费进行更换',
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

  constructor(public activeRoute: ActivatedRoute) { }

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
          this.packagesOfCampain.push(item);
        }
        return item['CAMPAIGN'] === campainNO['CAMPCD'];
      });
    });
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.parmVN = params['parmVN'];
      this.getCapainPackage();
    });
  }

  doClick(item) {
    item.selected = !item.selected
  }

  select(item) {
    if ( item.selected ) {
      this.selectedAmount += 1;
    } else {
      this.selectedAmount -= 1;
    }
  }

}
