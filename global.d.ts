declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'survey-core/survey-core.css';
declare module 'survey-creator-core/survey-creator-core.css';
declare module 'survey-core/survey.i18n';
declare module 'survey-creator-core/survey-creator-core.i18n';
declare module 'survey-core/themes';
declare module 'survey-core/themes/*';
