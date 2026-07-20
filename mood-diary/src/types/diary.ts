export type Mood = 'great' | 'good' | 'okay' | 'sad' | 'awful';
export type Weather = 'sunny' | 'cloudy' | 'overcast' | 'rainy' | 'snowy' | 'windy';

export interface Diary {
  id: string;
  date: string; // YYYY-MM-DD
  content: string;
  mood: Mood;
  weather: Weather;
  tags: string[];
  images: string[]; // Base64
  createdAt: number;
  updatedAt: number;
}

export type Page = 'editor' | 'calendar' | 'list' | 'statistics';
