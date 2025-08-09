import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  isSameMinute,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const locale = ptBR;
export const fmt = (date: Date, f: string) => format(date, f, { locale });
export const parse = (iso: string) => parseISO(iso);
export const startWeek = (date: Date) => startOfWeek(date, { weekStartsOn: 1 });
export const monthDays = (date: Date) => {
  const start = startWeek(startOfMonth(date));
  const end = addDays(startWeek(endOfMonth(date)), 6);
  return eachDayOfInterval({ start, end });
};
export const weekHours = (date: Date) => {
  const start = startOfDay(date);
  const end = endOfDay(date);
  return eachHourOfInterval({ start, end });
};
export const add = {
  day: (d: Date, n: number) => addDays(d, n),
  week: (d: Date, n: number) => addWeeks(d, n),
  month: (d: Date, n: number) => addMonths(d, n),
};
export const sameDay = isSameDay;
export const sameMinute = isSameMinute;
export const before = isBefore;
