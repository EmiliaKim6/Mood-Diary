import { useState, useMemo } from 'react';
import type { Diary, Mood } from '../../types/diary';
import { MOOD_OPTIONS, MOOD_VALUE_MAP } from '../../constants';
import { formatDate } from '../../utils/date';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import './Statistics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StatisticsProps {
  diaries: Diary[];
}

type Period = 7 | 30;

export default function Statistics({ diaries }: StatisticsProps) {
  const [period, setPeriod] = useState<Period>(7);

  const stats = useMemo(() => {
    const totalDiaries = diaries.length;
    const moodCounts: Record<Mood, number> = { great: 0, good: 0, okay: 0, sad: 0, awful: 0 };
    const tagCounts: Record<string, number> = {};

    diaries.forEach((d) => {
      moodCounts[d.mood]++;
      d.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const avgMood =
      totalDiaries > 0
        ? diaries.reduce((sum, d) => sum + MOOD_VALUE_MAP[d.mood], 0) / totalDiaries
        : 0;

    return { totalDiaries, moodCounts, tagCounts, avgMood };
  }, [diaries]);

  // 心情趋势数据
  const trendData = useMemo(() => {
    const now = new Date();
    const days: string[] = [];
    const values: number[] = [];

    for (let i = period - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = formatDate(d);
      days.push(`${d.getMonth() + 1}/${d.getDate()}`);
      const diary = diaries.find((di) => di.date === dateStr);
      values.push(diary ? MOOD_VALUE_MAP[diary.mood] : 0);
    }

    return { days, values };
  }, [diaries, period]);

  // 心情分布数据
  const moodDistribution = useMemo(() => {
    return MOOD_OPTIONS.map((opt) => stats.moodCounts[opt.value]);
  }, [stats]);

  // 标签使用数据
  const tagData = useMemo(() => {
    const entries = Object.entries(stats.tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    return {
      labels: entries.map(([tag]) => tag),
      values: entries.map(([, count]) => count),
    };
  }, [stats]);

  if (diaries.length === 0) {
    return (
      <div className="statistics">
        <h2 className="statistics-title">统计分析</h2>
        <div className="empty-stats">
          <div className="empty-stats-emoji">📊</div>
          <div className="empty-stats-text">写一些日记后就能看到统计啦！</div>
        </div>
      </div>
    );
  }

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? '#98989d' : '#6e6e73';

  return (
    <div className="statistics">
      <h2 className="statistics-title">统计分析</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalDiaries}</div>
          <div className="stat-label">总日记数</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.avgMood.toFixed(1)}</div>
          <div className="stat-label">平均心情</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats.tagCounts).length}</div>
          <div className="stat-label">使用标签数</div>
        </div>
      </div>

      {/* 心情趋势 */}
      <div className="chart-section">
        <div className="chart-title">心情趋势</div>
        <div className="chart-period">
          <button
            className={`period-btn ${period === 7 ? 'active' : ''}`}
            onClick={() => setPeriod(7)}
            type="button"
          >
            近7天
          </button>
          <button
            className={`period-btn ${period === 30 ? 'active' : ''}`}
            onClick={() => setPeriod(30)}
            type="button"
          >
            近30天
          </button>
        </div>
        <div className="chart-container">
          <Line
            data={{
              labels: trendData.days,
              datasets: [
                {
                  label: '心情值',
                  data: trendData.values,
                  borderColor: '#6c5ce7',
                  backgroundColor: 'rgba(108, 92, 231, 0.1)',
                  fill: true,
                  tension: 0.4,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  min: 0,
                  max: 5,
                  ticks: {
                    stepSize: 1,
                    color: textColor,
                    callback: (val) => {
                      const mood = Object.entries(MOOD_VALUE_MAP).find(([, v]) => v === val);
                      return mood ? MOOD_OPTIONS.find((o) => o.value === mood[0])?.label : '';
                    },
                  },
                  grid: { color: gridColor },
                },
                x: {
                  ticks: { color: textColor },
                  grid: { color: gridColor },
                },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </div>

      {/* 心情分布 */}
      <div className="chart-section">
        <div className="chart-title">心情分布</div>
        <div className="chart-container">
          <Pie
            data={{
              labels: MOOD_OPTIONS.map((o) => `${o.emoji} ${o.label}`),
              datasets: [
                {
                  data: moodDistribution,
                  backgroundColor: MOOD_OPTIONS.map((o) => o.color),
                  borderWidth: 2,
                  borderColor: isDark ? '#2c2c2e' : '#ffffff',
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  labels: { color: textColor, padding: 16 },
                },
              },
            }}
          />
        </div>
      </div>

      {/* 标签使用频率 */}
      {tagData.labels.length > 0 && (
        <div className="chart-section">
          <div className="chart-title">标签使用频率</div>
          <div className="chart-container">
            <Bar
              data={{
                labels: tagData.labels,
                datasets: [
                  {
                    label: '使用次数',
                    data: tagData.values,
                    backgroundColor: 'rgba(108, 92, 231, 0.6)',
                    borderRadius: 6,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: textColor },
                    grid: { color: gridColor },
                  },
                  x: {
                    ticks: { color: textColor },
                    grid: { display: false },
                  },
                },
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
