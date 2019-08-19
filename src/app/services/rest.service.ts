import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

    private url;
    private options = {
        headers: new HttpHeaders()
    };

    constructor(private http: HttpClient) {
        this.url = 'http://bmwpoc.cdkapps.cn:30091';
        this.setToken('token');
    }

    setToken(token) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        this.options = {
            headers
        };
    }

    private httpGet(url: string): Observable<any> {
        return this.http.get(url, this.options).pipe(
            map(this.extractDate),
            catchError(this.handleError([]))
        );
    }

    private httpPost(url: string, body: object): Observable<any> {
        this.options.headers.append('Content-Type', 'application/json');
        return this.http.post(url, body, this.options).pipe(
          map(this.extractDate),
          catchError(this.handleError([])),
        );
    }

    private httpPut(url: string, body: object): Observable<any> {
        this.options.headers.append('Content-Type', 'application/json');
        return this.http.put(url, body, this.options).pipe(
          map(this.extractDate),
          catchError(this.handleError([])),
        );
    }

    private httpDelete(url: string): Observable<any> {
        return this.http.delete(url, this.options).pipe(
            map(this.extractDate),
            catchError(this.handleError([]))
        );
    }

    private extractDate(res: Response) {
        return res || {};
    }

    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {
            return of(error as T);
        };
    }

    getEmployeeGlist(): Observable<any> {
        return this.httpGet(this.url + `/repairOrder/employeeGlist`);
    }

    /*get all customers and virecles information*/
    getBasicInfolist(): Observable<any> {
        return this.httpGet(this.url + `/repairOrder/GetBasicInfolist`);
    }

    /*get information by id*/
    getBasicInfoById(regno): Observable<any> {
        return this.httpGet(this.url + `/repairOrder/GetBasicInfo/` + regno);
    }

    getPackageList(): Observable<any> {
        return this.httpGet(this.url + `/repairOrder/GetPackagelist/`);
    }

    getVehiclePlate(data){
        const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/octet-stream; charset=utf-8',
            'Authorization': 'APPCODE c15d52d17fe341afaba457198e02aa13' 
              })
            };
        return this.http.post("http://ocrcp.market.alicloudapi.com/rest/160601/ocr/ocr_vehicle_plate.json", data, httpOptions);
    }

    getPaintPackagelist(): Observable<any> {
        return this.httpGet(this.url + `/repairOrder/GetPaintPackagelist`);
    }


}