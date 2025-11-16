'use client'

import { useCallback, useState, useEffect } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/survey-core.css';
import 'survey-core/survey.i18n';
import { LayeredLight } from 'survey-core/themes';

export default function SurveyComponent() {
  const [surveyModel, setSurveyModel] = useState<Model | null>(null);

  useEffect(() => {
    // Загружаем JSON анкеты из localStorage
    const savedJson = window.localStorage.getItem("survey-json");
    
    if (savedJson) {
      try {
        const surveyJson = JSON.parse(savedJson);
        const survey = new Model(surveyJson);
        
        // Применяем сохранённую тему или дефолтную
        const savedTheme = window.localStorage.getItem("survey-theme-json");
        if (savedTheme) {
          try {
            const themeJson = JSON.parse(savedTheme);
            survey.applyTheme(themeJson);
            console.log("✅ Применена сохранённая тема");
          } catch (error) {
            console.error("❌ Ошибка применения темы:", error);
            survey.applyTheme(LayeredLight);
            console.log("ℹ️ Применена дефолтная тема (fallback)");
          }
        } else {
          survey.applyTheme(LayeredLight);
          console.log("ℹ️ Применена дефолтная тема LayeredLight");
        }
        
        // Устанавливаем русский язык
        survey.locale = "ru";
        
        setSurveyModel(survey);
      } catch (error) {
        console.error("❌ Ошибка загрузки анкеты:", error);
      }
    }
  }, []);

  // Обработка завершения анкеты
  const surveyComplete = useCallback((survey: Model) => {
    const results = survey.data;
    
    console.log("📋 Результаты анкеты:", results);
    
    // Сохраняем в localStorage с временной меткой
    const timestamp = new Date().toISOString();
    const resultWithTimestamp = {
      ...results,
      submittedAt: timestamp
    };
    
    const savedResults = JSON.parse(
      window.localStorage.getItem("survey-results") || "[]"
    );
    savedResults.push(resultWithTimestamp);
    window.localStorage.setItem("survey-results", JSON.stringify(savedResults));
    
    alert("✅ Анкета успешно отправлена!\n\nСпасибо за ваши ответы.");
    
    // TODO: Здесь будет отправка на сервер (AmoCRM/n8n)
    // saveSurveyResults("https://your-api.com/submit", resultWithTimestamp);
    
  }, []);

  // Если анкета не загружена
  if (!surveyModel) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          ⏳ Загрузка анкеты...
        </p>
        <p style={{ fontSize: '0.9rem', color: '#999' }}>
          Если анкета не загружается, сначала создайте её в{' '}
          <a href="/creator" style={{ color: '#0070f3' }}>конструкторе</a>
        </p>
      </div>
    );
  }

  // Добавляем обработчик завершения
  surveyModel.onComplete.add(surveyComplete);

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '2rem auto', 
      padding: '0 1rem' 
    }}>
      <Survey model={surveyModel} />
    </div>
  );
}

// Функция для отправки на сервер (будет использоваться позже)
function saveSurveyResults(url: string, data: object) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log("✅ Результаты успешно отправлены на сервер");
    } else {
      console.error("❌ Ошибка отправки на сервер");
    }
  })
  .catch(error => {
    console.error("❌ Ошибка сети:", error);
  });
}
