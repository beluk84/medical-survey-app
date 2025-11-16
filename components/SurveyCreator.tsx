'use client'

import { useState } from "react";
import { ICreatorOptions } from "survey-creator-core";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import "survey-creator-core/survey-creator-core.i18n";
import "survey-core/survey.i18n";
import { surveyLocalization } from "survey-core";
import SurveyTheme from "survey-core/themes";
import { registerSurveyTheme } from "survey-creator-core";

registerSurveyTheme(SurveyTheme);
surveyLocalization.supportedLocales = ["en", "ru", "zh-cn"];

const defaultCreatorOptions: ICreatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true,
  showThemeTab: true,
  showTranslationTab: true,
  showLogicTab: true,
  isAutoSave: true
};

const defaultJson = {
  title: "Медицинская анкета пациента",
  description: "Пожалуйста, заполните информацию о вашем здоровье",
  logoPosition: "right",
  pages: [
    {
      name: "personalInfo",
      title: "Личные данные",
      elements: [
        {
          type: "text",
          name: "lastName",
          title: "Фамилия",
          isRequired: true
        },
        {
          type: "text",
          name: "firstName",
          title: "Имя",
          isRequired: true
        },
        {
          type: "text",
          name: "middleName",
          title: "Отчество"
        },
        {
          type: "text",
          name: "birthDate",
          title: "Дата рождения",
          inputType: "date",
          isRequired: true
        },
        {
          type: "dropdown",
          name: "gender",
          title: "Пол",
          isRequired: true,
          choices: [
            { value: "male", text: "Мужской" },
            { value: "female", text: "Женский" }
          ]
        }
      ]
    },
    {
      name: "medicalHistory",
      title: "Медицинская история",
      elements: [
        {
          type: "checkbox",
          name: "chronicDiseases",
          title: "Хронические заболевания",
          choices: ["Диабет", "Гипертония", "Астма", "Заболевания сердца", "Другое"]
        },
        {
          type: "comment",
          name: "currentComplaints",
          title: "Текущие жалобы",
          placeholder: "Опишите ваши симптомы...",
          rows: 4
        }
      ]
    }
  ],
  showProgressBar: "top",
  progressBarType: "pages"
};

export default function SurveyCreatorWidget(props: { json?: Object, options?: ICreatorOptions }) {
  let [creator, setCreator] = useState<SurveyCreator>();

  if (!creator) {
    creator = new SurveyCreator(props.options || defaultCreatorOptions);
    creator.locale = "ru";
    setCreator(creator);
  }

  // Сохранение анкеты в localStorage
  creator.saveSurveyFunc = (saveNo: number, callback: (num: number, status: boolean) => void) => {
    try {
      window.localStorage.setItem("survey-json", creator.text);
      console.log("✅ Анкета сохранена #" + saveNo);
      callback(saveNo, true);
    } catch (error) {
      console.error("❌ Ошибка сохранения анкеты:", error);
      callback(saveNo, false);
    }
  };

  // Сохранение темы в localStorage
  creator.saveThemeFunc = (saveNo: number, callback: (num: number, status: boolean) => void) => {
    try {
      window.localStorage.setItem("survey-theme-json", JSON.stringify(creator.theme));
      console.log("🎨 Тема сохранена #" + saveNo);
      callback(saveNo, true);
    } catch (error) {
      console.error("❌ Ошибка сохранения темы:", error);
      callback(saveNo, false);
    }
  };

  // Загрузка JSON анкеты
  creator.text = JSON.stringify(props.json) || 
                 window.localStorage.getItem("survey-json") || 
                 JSON.stringify(defaultJson);

  // Загрузка сохранённой темы
  const savedTheme = window.localStorage.getItem("survey-theme-json");
  if (savedTheme) {
    try {
      creator.theme = JSON.parse(savedTheme);
      console.log("🎨 Тема загружена из localStorage");
    } catch (error) {
      console.error("❌ Ошибка загрузки темы:", error);
    }
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  );
}