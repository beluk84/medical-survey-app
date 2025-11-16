'use client'

import dynamic from 'next/dynamic';
import Link from 'next/link';

// Динамический импорт Survey (ssr: false обязательно)
const SurveyComponent = dynamic(
  () => import("@/components/Survey"), 
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
        ⏳ Загрузка анкеты...
      </div>
    )
  }
);

export default function SurveyPage() {
  return (
    <main>
      <div style={{ 
        background: '#f5f5f5', 
        padding: '1rem', 
        borderBottom: '1px solid #e0e0e0',
        marginBottom: '1rem'
      }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
            🏥 Медицинская анкета
          </h1>
          <Link href="/" style={{ 
            color: '#0070f3', 
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}>
            ← Вернуться на главную
          </Link>
        </div>
      </div>
      
      <SurveyComponent />
    </main>
  );
}
