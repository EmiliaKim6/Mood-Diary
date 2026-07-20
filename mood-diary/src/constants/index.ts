import type { Mood, Weather } from '../types/diary';

export const MOOD_OPTIONS: { value: Mood; label: string; emoji: string; color: string }[] = [
  { value: 'great', label: '很棒', emoji: '😄', color: '#4CAF50' },
  { value: 'good', label: '开心', emoji: '🙂', color: '#8BC34A' },
  { value: 'okay', label: '一般', emoji: '😐', color: '#FFC107' },
  { value: 'sad', label: '难过', emoji: '😔', color: '#FF9800' },
  { value: 'awful', label: '糟糕', emoji: '😢', color: '#F44336' },
];

export const WEATHER_OPTIONS: { value: Weather; label: string; emoji: string }[] = [
  { value: 'sunny', label: '晴', emoji: '☀️' },
  { value: 'cloudy', label: '多云', emoji: '⛅' },
  { value: 'overcast', label: '阴', emoji: '☁️' },
  { value: 'rainy', label: '雨', emoji: '🌧️' },
  { value: 'snowy', label: '雪', emoji: '❄️' },
  { value: 'windy', label: '风', emoji: '💨' },
];

export const STORAGE_KEY = 'mood-diary-data';
export const THEME_KEY = 'mood-diary-theme';
export const TAGS_KEY = 'mood-diary-tags';
export const MAX_IMAGES = 3;
export const MAX_IMAGE_SIZE = 500 * 1024; // 500KB

export const MOOD_VALUE_MAP: Record<Mood, number> = {
  great: 5,
  good: 4,
  okay: 3,
  sad: 2,
  awful: 1,
};
