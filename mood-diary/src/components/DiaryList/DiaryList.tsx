import { useState, useMemo } from 'react';
import type { Diary, Mood } from '../../types/diary';
import { MOOD_OPTIONS, WEATHER_OPTIONS } from '../../constants';
import { formatDisplayDate } from '../../utils/date';
import { exportAsJSON, exportAsTXT } from '../../utils/export';
import './DiaryList.css';

interface DiaryListProps {
  diaries: Diary[];
  tags: string[];
  onEdit: (date: string) => void;
  onDelete: (id: string) => void;
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}

export default function DiaryList({ diaries, tags, onEdit, onDelete, onDeleteTag }: DiaryListProps) {
  const [searchText, setSearchText] = useState('');
  const [filterMood, setFilterMood] = useState<Mood | ''>('');
  const [filterTag, setFilterTag] = useState('');
  const [detailDiary, setDetailDiary] = useState<Diary | null>(null);

  const filteredDiaries = useMemo(() => {
    let result = [...diaries].sort((a, b) => b.date.localeCompare(a.date));

    if (searchText) {
      const lower = searchText.toLowerCase();
      result = result.filter((d) => d.content.toLowerCase().includes(lower));
    }

    if (filterMood) {
      result = result.filter((d) => d.mood === filterMood);
    }

    if (filterTag) {
      result = result.filter((d) => d.tags.includes(filterTag));
    }

    return result;
  }, [diaries, searchText, filterMood, filterTag]);

  const getMoodEmoji = (mood: Mood) => MOOD_OPTIONS.find((o) => o.value === mood)?.emoji || '';
  const getWeatherEmoji = (weather: Diary['weather']) =>
    WEATHER_OPTIONS.find((o) => o.value === weather)?.emoji || '';

  return (
    <div className="diary-list">
      <div className="diary-list-header">
        <h2 className="diary-list-title">日记列表</h2>
        <div className="diary-list-actions">
          <button className="btn-export" onClick={() => exportAsJSON(diaries)} type="button">
            导出 JSON
          </button>
          <button className="btn-export" onClick={() => exportAsTXT(diaries)} type="button">
            导出 TXT
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="搜索日记内容..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="search-filter"
          value={filterMood}
          onChange={(e) => setFilterMood(e.target.value as Mood | '')}
        >
          <option value="">全部心情</option>
          {MOOD_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.emoji} {opt.label}
            </option>
          ))}
        </select>
        {tags.length > 0 && (
          <select
            className="search-filter"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="">全部标签</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        )}
      </div>

      {tags.length > 0 && (
        <div className="tags-section">
          <div className="tags-header">
            <span className="tags-title">标签管理</span>
          </div>
          <div className="tags-list">
            {tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
                <button
                  className="tag-chip-remove"
                  onClick={() => onDeleteTag(tag)}
                  type="button"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="diary-cards">
        {filteredDiaries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-emoji">📝</div>
            <div className="empty-state-text">
              {diaries.length === 0 ? '还没有日记，去写一篇吧！' : '没有找到匹配的日记'}
            </div>
          </div>
        ) : (
          filteredDiaries.map((diary) => (
            <div key={diary.id} className="diary-card" onClick={() => setDetailDiary(diary)}>
              <div className="diary-card-header">
                <span className="diary-card-date">{formatDisplayDate(diary.date)}</span>
                <div className="diary-card-meta">
                  <span className="diary-card-emoji">{getWeatherEmoji(diary.weather)}</span>
                  <span className="diary-card-emoji">{getMoodEmoji(diary.mood)}</span>
                </div>
              </div>
              <div className="diary-card-content">{diary.content}</div>
              {diary.images.length > 0 && (
                <div className="diary-card-images">
                  {diary.images.slice(0, 3).map((img, i) => (
                    <img key={i} className="diary-card-img" src={img} alt="" />
                  ))}
                </div>
              )}
              <div className="diary-card-footer">
                <div className="diary-card-tags">
                  {diary.tags.map((tag) => (
                    <span key={tag} className="diary-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="diary-card-actions">
                  <button
                    className="diary-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(diary.date);
                    }}
                    type="button"
                  >
                    编辑
                  </button>
                  <button
                    className="diary-card-btn danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('确定删除这篇日记吗？')) {
                        onDelete(diary.id);
                      }
                    }}
                    type="button"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {detailDiary && (
        <div className="detail-overlay" onClick={() => setDetailDiary(null)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="detail-close" onClick={() => setDetailDiary(null)} type="button">
              ✕
            </button>
            <div className="detail-date">{formatDisplayDate(detailDiary.date)}</div>
            <div className="detail-meta">
              <span className="detail-meta-item">
                {getMoodEmoji(detailDiary.mood)}{' '}
                {MOOD_OPTIONS.find((o) => o.value === detailDiary.mood)?.label}
              </span>
              <span className="detail-meta-item">
                {getWeatherEmoji(detailDiary.weather)}{' '}
                {WEATHER_OPTIONS.find((o) => o.value === detailDiary.weather)?.label}
              </span>
            </div>
            <div className="detail-content">{detailDiary.content}</div>
            {detailDiary.images.length > 0 && (
              <div className="detail-images">
                {detailDiary.images.map((img, i) => (
                  <img key={i} className="detail-img" src={img} alt="" />
                ))}
              </div>
            )}
            {detailDiary.tags.length > 0 && (
              <div className="detail-tags">
                {detailDiary.tags.map((tag) => (
                  <span key={tag} className="diary-card-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
