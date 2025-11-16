import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      padding: '3rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        🏥 Медицинская анкета
      </h1>
      
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
        Конструктор анкет для пациентов клиник медицинского туризма в Китае
      </p>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.3rem', marginTop: 0 }}>Возможности:</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Создание медицинских анкет drag-and-drop</li>
          <li>Автосохранение в localStorage</li>
          <li>Настройка тем оформления</li>
          <li>Поддержка многоязычности (RU/EN/CN)</li>
          <li>Интеграция с AmoCRM и n8n (планируется)</li>
        </ul>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <Link href="/creator" style={{ 
          display: 'block',
          padding: '1.5rem', 
          background: '#0070f3', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '1.1rem',
          fontWeight: '500',
          transition: 'background 0.3s'
        }}>
          🛠️ Конструктор анкет
          <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>
            Для администраторов
          </div>
        </Link>
        
        <Link href="/survey" style={{ 
          display: 'block',
          padding: '1.5rem', 
          background: '#10b981', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '1.1rem',
          fontWeight: '500',
          transition: 'background 0.3s'
        }}>
          📝 Заполнить анкету
          <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>
            Для пациентов
          </div>
        </Link>
      </div>
      
      <div style={{ 
        marginTop: '3rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid #e0e0e0',
        fontSize: '0.9rem',
        color: '#999'
      }}>
        <p>Проект на базе: React 19 + Next.js 15.5.6 + SurveyJS</p>
        <p>Часовой пояс: GMT+3 (Москва)</p>
      </div>
    </main>
  );
}