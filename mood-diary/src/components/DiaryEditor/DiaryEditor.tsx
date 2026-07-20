import { useState, useEffect, useRef } from 'react';
import type { Diary, Mood, Weather } from '../../types/diary';
import { MOOD_OPTIONS, WEATHER_OPTIONS, MAX_IMAGES, MAX_IMAGE_SIZE } from '../../constants';
import { formatDate } from '../../utils/date';
import './DiaryEditor.css';

interface DiaryEditorProps {
  diaries: Diary[];
  tags: string[];
  editingDate?: string;
  onSave: (diary: Diary) => void;
  onAddTag: (tag: string) => void;
}

export default function DiaryEditor({ diaries, tags, editingDate, onSave, onAddTag }: DiaryEditorProps) {
  const [date, setDate] = useState(formatDate(new Date()));
  const [mood, setMood] = useState<Mood | ''>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingDate) {
      const existing = diaries.find((d) => d.date === editingDate);
      if (existing) {
        setDate(existing.date);
        setMood(existing.mood);
        setWeather(existing.weather);
        setContent(existing.content);
        setSelectedTags(existing.tags);
        setImages(existing.images);
      }
    } else {
      setDate(formatDate(new Date()));
      setMood('');
      setWeather('');
      setContent('');
      setSelectedTags([]);
      setImages([]);
    }
  }, [editingDate, diaries]);

  const handleSave = () => {
    if (!mood || !content.trim()) return;

    const existing = diaries.find((d) => d.date === date);
    const now = Date.now();

    onSave({
      id: existing?.id || crypto.randomUUID(),
      date,
      content: content.trim(),
      mood,
      weather: weather || 'sunny',
      tags: selectedTags,
      images,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    });

    // 重置表单
    if (!editingDate) {
      setMood('');
      setWeather('');
      setContent('');
      setSelectedTags([]);
      setImages([]);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAddTag(trimmed);
    }
    if (trimmed) {
      toggleTag(trimmed);
      setNewTag('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (images.length >= MAX_IMAGES) return;
      if (file.size > MAX_IMAGE_SIZE) {
        alert('图片大小不能超过 500KB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setImages((prev) => {
          if (prev.length >= MAX_IMAGES) return prev;
          return [...prev, result];
        });
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="editor">
      <h2 className="editor-title">{editingDate ? '编辑日记' : '写日记'}</h2>
      <div className="editor-card">
        <div className="editor-section">
          <label className="editor-label">日期</label>
          <input
            type="date"
            className="editor-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="editor-section">
          <label className="editor-label">今天心情如何？</label>
          <div className="mood-selector">
            {MOOD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`mood-btn ${mood === opt.value ? 'active' : ''}`}
                onClick={() => setMood(opt.value)}
                type="button"
              >
                <span className="mood-emoji">{opt.emoji}</span>
                <span className="mood-label">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="editor-section">
          <label className="editor-label">天气</label>
          <div className="weather-selector">
            {WEATHER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`weather-btn ${weather === opt.value ? 'active' : ''}`}
                onClick={() => setWeather(opt.value)}
                type="button"
              >
                <span className="weather-emoji">{opt.emoji}</span>
                <span className="weather-label">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="editor-section">
          <label className="editor-label">标签</label>
          <div className="tags-container">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`tag-item ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleTag(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="tag-input-row">
            <input
              type="text"
              className="tag-input"
              placeholder="添加新标签..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <button className="tag-add-btn" onClick={handleAddTag} type="button">
              添加
            </button>
          </div>
        </div>

        <div className="editor-section">
          <label className="editor-label">日记内容</label>
          <textarea
            className="editor-textarea"
            placeholder="记录今天的心情和想法..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="images-section">
          <label className="editor-label">图片（最多{MAX_IMAGES}张，单张不超过500KB）</label>
          <div className="images-grid">
            {images.map((img, i) => (
              <div key={i} className="image-item">
                <img src={img} alt={`上传图片 ${i + 1}`} />
                <button className="image-remove" onClick={() => removeImage(i)} type="button">
                  ✕
                </button>
              </div>
            ))}
            {images.length < MAX_IMAGES && (
              <button
                className="image-add"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                <span className="image-add-icon">+</span>
                <span>添加图片</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>

        <div className="editor-actions">
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={!mood || !content.trim()}
            type="button"
          >
            保存日记
          </button>
        </div>
      </div>
    </div>
  );
}
