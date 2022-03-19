import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform( items: any[] | undefined,value: any): String[] {
    let array : string[] = [];

    if (!value || !items) {
      // @ts-ignore
      return items;
    }

      items.forEach(item => {
       let use = item.split("=");
       let result = use[0];
      let genders : string[] = use[1].split("/");
      genders
        .forEach(value1 => {
         if (value1.trim().toUpperCase() === value.gender.toUpperCase().trim()){
           array.push(result.charAt(0).toUpperCase() + result.slice(1).toLowerCase());
         }
        })
    })

    return array;
  }

}
