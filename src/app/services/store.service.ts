import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class StoreService {

    public maintenanceList = [];

    public compainList = [];

    public accidentList = [];

    public etcList = [];

    public checkList = [];

    private _customer:any;

    constructor() {
    }

    public set customer(_customer){
      this._customer = _customer;
    }
    public get customer(){
      return this._customer;
    }

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
}