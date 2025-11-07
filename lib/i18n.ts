// Simple i18n utility - can be replaced with next-intl or next-i18next
type Locale = "es" | "en"

const translations: Record<string, any> = {}

export async function initTranslations(locale: Locale) {
  if (!translations[locale]) {
    try {
      const data = await import(`../public/locales/${locale}.json`)
      translations[locale] = data.default
    } catch (error) {
      console.error(`Failed to load translations for ${locale}`)
      translations[locale] = {}
    }
  }
  return translations[locale]
}

export function t(path: string, locale: Locale = "es"): string {
  const keys = path.split(".")
  let value: any = translations[locale]

  for (const key of keys) {
    value = value?.[key]
  }

  return value || path
}

export const LOCALES: Locale[] = ["es", "en"]
export const DEFAULT_LOCALE: Locale = "es"
