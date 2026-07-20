import { useState } from 'react';
import type { Diary } from '../../types/diary';
import { MOOD_OPTIONS } from '../../constants';
import {
  formatDate,
  getMonthDays,
  getMonthStartDay,
  getPrevMonth,
  getNextMonth,
  checkIsToday,
  format,
  startOfMonth,
} from '../../utils/date';
import './CalendarView.css';

interface CalendarViewProps {
  diaries: Diary[];
  onSelectDate: (date: string) => void;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export default function CalendarView({ diaries, onSelectDate }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthDays = getMonthDays(year, month);
  const startDay = getMonthStartDay(year, month);

  // 上个月的尾部日期填充
  const prevMonth = getPrevMonth(currentDate);
  const prevMonthDays = getMonthDays(prevMonth.getFullYear(), prevMonth.getMonth());
  const prevDays = Array.from({ length: startDay }, (_, i) => {
    const day = prevMonthDays.length - startDay + 1 + i;
    return { date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day), isCurrentMonth: false };
  });

  // 当月日期
  const currentDays = monthDays.map((d) => ({
    date: d,
    isCurrentMonth: true,
  }));

  // 下个月的头部日期填充
  const totalCells = prevDays.length + currentDays.length;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  const nextMonth = getNextMonth(currentDate);
  const nextDays = Array.from({ length: remainingCells }, (_, i) => ({
    date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1),
    isCurrentMonth: false,
  }));

  const allDays = [...prevDays, ...currentDays, ...nextDays];

  const getDiaryForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return diaries.find((d) => d.date === dateStr);
  };

  const getMoodEmoji = (mood: Diary['mood']) => {
    return MOOD_OPTIONS.find((o) => o.value === mood)?.emoji || '';
  };

  const handlePrevMonth = () => setCurrentDate(getPrevMonth(currentDate));
  const handleNextMonth = () => setCurrentDate(getNextMonth(currentDate));
  const handleToday = () => setCurrentDate(new Date());

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2 className="calendar-title">
          {format(startOfMonth(currentDate), 'yyyy年M月')}
        </h2>
        <div className="calendar-nav">
          <button className="calendar-today-btn" onClick={handleToday} type="button">
            今天
          </button>
          <button className="calendar-nav-btn" onClick={handlePrevMonth} type="button">
            ‹
          </button>
          <button className="calendar-nav-btn" onClick={handleNextMonth} type="button">
            ›
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {WEEKDAYS.map((wd) => (
            <div key={wd} className="calendar-weekday">
              {wd}
            </div>
          ))}
        </div>
        <div className="calendar-days">
          {allDays.map((dayInfo, i) => {
            const diary = getDiaryForDate(dayInfo.date);
            const isToday = checkIsToday(dayInfo.date);
            return (
              <div
                key={i}
                className={`calendar-day ${!dayInfo.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${diary ? 'has-diary' : ''}`}
                onClick={() => dayInfo.isCurrentMonth && onSelectDate(formatDate(dayInfo.date))}
              >
                <span className="calendar-day-number">{dayInfo.date.getDate()}</span>
                {diary ? (
                  <span className="calendar-day-mood">{getMoodEmoji(diary.mood)}</span>
                ) : (
                  dayInfo.isCurrentMonth && <span className="calendar-day-dot" style={{ opacity: 0.2 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="calendar-legend">
        {MOOD_OPTIONS.map((opt) => (
          <div key={opt.value} className="calendar-legend-item">
            <span>{opt.emoji}</span>
            <span>{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
