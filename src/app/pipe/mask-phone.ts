import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maskPhone'
})
export class MaskPhonePipe implements PipeTransform {

    transform(phone: any): any {
        if (!phone || phone.length < 11) {
            return '138********';
        }
        return phone.substr(0,3) + '****' + phone.substr(8);;
    }

}