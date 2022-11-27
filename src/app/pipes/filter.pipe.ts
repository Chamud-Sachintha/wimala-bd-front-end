import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, type: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      return (
        (type === 'MB' ? it.branchRefNo.toLowerCase().includes(searchText) || it.branchEmployeeName.includes(searchText)
          : (type === 'A' ? it.agentRefNo.toLowerCase().includes(searchText) : ""))
      );
    });
  }

}
