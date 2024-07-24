import { parse } from 'date-fns';
import { es } from 'date-fns/locale';

export function parseSpanishDate(dateString: string): Date {
  const parsedDate = parse(dateString, 'dd-MMM-yyyy', new Date(), {
    locale: es,
  });

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date string');
  }

  return parsedDate;
}
