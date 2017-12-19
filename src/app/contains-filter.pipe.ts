import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'contains'
})
export class ContainsFilterPipe implements PipeTransform {

    transform(values: any[], match: string | string[]): any {

        if (!match || match instanceof Array && match.length == 0) {
            return values;
        }

        let matches = [];
        if (match instanceof Array) {
            matches = match;
        }
        else {
            matches = [match];
        }

        matches = matches.filter( m => { return m });

        if (!matches.length) {
            return values;
        }

        return values.filter(value => {
            if (!value) {
                return false;
            }
            for (let matchItem of matches) {
                if (value.toString().toLowerCase().indexOf(matchItem.toLowerCase()) >= 0) {
                    return true;
                }
            }
            return false;
        });
    }

}
