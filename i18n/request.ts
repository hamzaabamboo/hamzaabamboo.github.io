import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  // Ensure that incoming `locale` is valid
  if (!locale || !['en', 'ja'].includes(locale)) {
    locale = 'en';
  }
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
