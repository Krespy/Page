import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
  }

  itemsPerPageLabel = 'Cursos por página: ';
  nextPageLabel = 'Página siguiente';
  previousPageLabel = 'Página anterior';
  firstPageLabel = 'Primera Página';
  lastPageLabel = 'Ultima Página';

 getRangeLabel = (page: number, pageSize: number, length: number) =>  {    
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    console.log("PaginatorClass: - page_number: " + page + " PageSize: " + pageSize + " length: " + length )
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    console.log("Start: " + startIndex + " endIndex: " + endIndex + " Length: " + length)
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }
}