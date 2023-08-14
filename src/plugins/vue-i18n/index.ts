import { DEFAULT_LOCALE } from "@/constants/local-storage-key"
import en from "@/locale/en"
import zh from "@/locale/zh"
import { getCachedLocale } from "@/utils/cache/local-storage"
import { type App } from "vue"
import { createI18n } from "vue-i18n"

const messages = {
  en,
  zh
}

const i18n = createI18n({
  locale: getCachedLocale() || DEFAULT_LOCALE, // set locale
  fallbackLocale: DEFAULT_LOCALE, // set fallback locale
  // 解决控制台⚠️
  fallbackWarn: false,
  missingWarn: false,
  // https://blog.csdn.net/u011159821/article/details/131928823
  legacy: false,
  messages // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

export function loadVueI18n(app: App) {
  app.use(i18n)
}
