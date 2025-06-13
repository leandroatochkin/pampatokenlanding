import { GridLocaleText } from '@mui/x-data-grid';

export const customLocaleText: Partial<GridLocaleText> = {
  noRowsLabel: 'Nada por aquí',
  columnMenuSortAsc: 'Ordenar ascendente',
  columnMenuSortDesc: 'Ordenar descendente',
  paginationDisplayedRows: ({ from, to, count }) => { 
    if (count === 0) {
      return 'No hay filas';
    }
    return `Mostrando ${from} a ${to} de ${count} filas`;
  },
  paginationRowsPerPage: 'Filas por página',
};
