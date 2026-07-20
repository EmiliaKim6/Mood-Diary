import type { ReactNode } from 'react';
import type { Page } from '../../types/diary';
import { useTheme } from '../../hooks/useTheme';
import './Layout.css';

interface LayoutProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: ReactNode;
}

const NAV_ITEMS: { page: Page; label: string; emoji: string }[] = [
  { page: 'editor', label: '写日记', emoji: '✏️' },
  { page: 'calendar', label: '日历', emoji: '📅' },
  { page: 'list', label: '列表', emoji: '📋' },
  { page: 'statistics', label: '统计', emoji: '📊' },
];

export default function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="layout">
      <nav className="nav">
        <div className="nav-brand" onClick={() => onNavigate('editor')}>
          <span className="nav-brand-emoji">📖</span>
          <span>心情日记</span>
        </div>
        <div className="nav-tabs">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.page}
              className={`nav-tab ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => onNavigate(item.page)}
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="theme-btn" onClick={toggleTheme} title="切换主题">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
      <main className="main">{children}</main>
    </div>
  );
}
