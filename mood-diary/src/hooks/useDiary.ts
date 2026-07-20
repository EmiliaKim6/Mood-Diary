import { useState, useEffect, useCallback } from 'react';
import type { Diary } from '../types/diary';
import { loadDiaries, saveDiaries, loadTags, saveTags } from '../utils/storage';

export function useDiary() {
  const [diaries, setDiaries] = useState<Diary[]>(() => loadDiaries());
  const [tags, setTags] = useState<string[]>(() => loadTags());

  useEffect(() => {
    saveDiaries(diaries);
  }, [diaries]);

  useEffect(() => {
    saveTags(tags);
  }, [tags]);

  const addDiary = useCallback((diary: Diary) => {
    setDiaries((prev) => {
      const existing = prev.findIndex((d) => d.date === diary.date);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = diary;
        return updated;
      }
      return [...prev, diary];
    });
  }, []);

  const deleteDiary = useCallback((id: string) => {
    setDiaries((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const getDiaryByDate = useCallback(
    (date: string) => diaries.find((d) => d.date === date),
    [diaries]
  );

  const addTag = useCallback(
    (tag: string) => {
      if (!tags.includes(tag)) {
        setTags((prev) => [...prev, tag]);
      }
    },
    [tags]
  );

  const deleteTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  return { diaries, tags, addDiary, deleteDiary, getDiaryByDate, addTag, deleteTag };
}
