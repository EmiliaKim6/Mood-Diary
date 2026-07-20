import type { Diary } from '../types/diary';

export function exportAsJSON(diaries: Diary[]): void {
  const json = JSON.stringify(diaries, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  downloadBlob(blob, `心情日记_${new Date().toISOString().slice(0, 10)}.json`);
}

export function exportAsTXT(diaries: Diary[]): void {
  const lines = diaries.map((d) => {
    const parts = [
      `日期: ${d.date}`,
      `心情: ${d.mood}`,
      `天气: ${d.weather}`,
      d.tags.length > 0 ? `标签: ${d.tags.join(', ')}` : '',
      '',
      d.content,
    ];
    return parts.filter(Boolean).join('\n');
  });
  const text = lines.join('\n\n---\n\n');
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, `心情日记_${new Date().toISOString().slice(0, 10)}.txt`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
