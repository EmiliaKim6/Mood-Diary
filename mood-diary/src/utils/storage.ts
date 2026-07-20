import type { Diary } from '../types/diary';
import { STORAGE_KEY, TAGS_KEY } from '../constants';

export function loadDiaries(): Diary[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveDiaries(diaries: Diary[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(diaries));
}

export function loadTags(): string[] {
  try {
    const data = localStorage.getItem(TAGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTags(tags: string[]): void {
  localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
}
