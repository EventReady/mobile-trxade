import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'letter' })
export class LetterPipe implements PipeTransform {
    transform(value:any) {
        if ( value ) {
			console.log( value );
            return value.toString().charAt(0).toUpperCase();
        }
        return value;
    }
}