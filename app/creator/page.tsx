'use client'  // 👈 ДОБАВЬ ЭТО В САМОЕ НАЧАЛО!

import dynamic from 'next/dynamic';

// 👈 КРИТИЧЕСКИ ВАЖНО: ssr: false для Survey Creator
// Survey Creator НЕ поддерживает server-side rendering
const SurveyCreatorComponent = dynamic(
  () => import("@/components/SurveyCreator"), 
  {
    ssr: false,
    loading: () => (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        ⏳ Загрузка Survey Creator...
      </div>
    )
  }
);

export default function CreatorPage() {
  return (
    <main>
      <SurveyCreatorComponent />
    </main>
  );
}
