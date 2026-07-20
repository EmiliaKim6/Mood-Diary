import { useState } from 'react';
import type { Page } from './types/diary';
import { useDiary } from './hooks/useDiary';
import Layout from './components/Layout/Layout';
import DiaryEditor from './components/DiaryEditor/DiaryEditor';
import CalendarView from './components/CalendarView/CalendarView';
import DiaryList from './components/DiaryList/DiaryList';
import Statistics from './components/Statistics/Statistics';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('editor');
  const [editingDate, setEditingDate] = useState<string | undefined>();
  const diaryStore = useDiary();

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page === 'editor') {
      setEditingDate(undefined);
    }
  };

  const handleEditDiary = (date: string) => {
    setEditingDate(date);
    setCurrentPage('editor');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'editor':
        return (
          <DiaryEditor
            diaries={diaryStore.diaries}
            tags={diaryStore.tags}
            editingDate={editingDate}
            onSave={diaryStore.addDiary}
            onAddTag={diaryStore.addTag}
          />
        );
      case 'calendar':
        return (
          <CalendarView
            diaries={diaryStore.diaries}
            onSelectDate={handleEditDiary}
          />
        );
      case 'list':
        return (
          <DiaryList
            diaries={diaryStore.diaries}
            tags={diaryStore.tags}
            onEdit={handleEditDiary}
            onDelete={diaryStore.deleteDiary}
            onAddTag={diaryStore.addTag}
            onDeleteTag={diaryStore.deleteTag}
          />
        );
      case 'statistics':
        return <Statistics diaries={diaryStore.diaries} />;
      default:
        return null;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}

export default App;
