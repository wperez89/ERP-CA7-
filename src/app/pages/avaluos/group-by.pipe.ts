import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {
  transform(value: any[], property: string): any {
    if (!value || !property) {
      return value;
    }

    const groupedData = {};

    value.forEach((item) => {
      const key = item[property];
      if (groupedData[key]) {
        groupedData[key].push(item);
      } else {
        groupedData[key] = [item];
      }
    });

    return Object.keys(groupedData).map((key) => ({
      key,
      value: groupedData[key]
    }));
  }
}