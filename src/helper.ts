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

export function getCurrentDate(loc: string): string {
  const [day, month, year] = new Date()
    .toLocaleDateString(loc)
    .split('/')
    .map((arg) => parseInt(arg));
  return new Date(year, month - 1, day).toISOString();
}
