import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class StoreService {

    public maintenanceList = [];

    public compainList = [];

    public accidentList = [];

    constructor() {
    }

}