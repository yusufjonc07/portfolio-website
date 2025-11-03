/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onClientEntry = () => {
  // Detect browser language and redirect on first visit
  const browserLang = navigator.language.split('-')[0]; // Gets 'ko' from 'ko-KR'
  const supportedLanguages = ['en', 'uz', 'ko'];
  const currentPath = window.location.pathname;

  // Check if we're already on a language-specific path
  const isOnLanguagePath = supportedLanguages.some(
    lang => currentPath.startsWith(`/${lang}/`) || currentPath === `/${lang}`,
  );

  // Only redirect if:
  // 1. Not already on a language path
  // 2. On root path
  // 3. Browser language is supported
  // 4. Haven't redirected before (check localStorage)
  if (
    !isOnLanguagePath &&
    currentPath === '/' &&
    supportedLanguages.includes(browserLang) &&
    browserLang !== 'en' &&
    !localStorage.getItem('languageRedirected')
  ) {
    localStorage.setItem('languageRedirected', 'true');
    window.location.replace(`/${browserLang}/`);
  }
};
