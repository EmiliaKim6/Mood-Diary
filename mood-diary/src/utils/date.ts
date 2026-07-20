import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay, subMonths, addMonths, isToday, isSameDay } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDisplayDate(dateStr: string): string {
  return format(parseISO(dateStr), 'yyyy年M月d日 EEEE', { locale: zhCN });
}

export function getMonthDays(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  return eachDayOfInterval({ start, end });
}

export function getMonthStartDay(year: number, month: number): number {
  return getDay(startOfMonth(new Date(year, month)));
}

export function getPrevMonth(date: Date): Date {
  return subMonths(date, 1);
}

export function getNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

export function checkIsToday(date: Date): boolean {
  return isToday(date);
}

export function checkIsSameDay(a: Date, b: Date): boolean {
  return isSameDay(a, b);
}

export { format, parseISO, startOfMonth, endOfMonth, subMonths, addMonths, zhCN };
