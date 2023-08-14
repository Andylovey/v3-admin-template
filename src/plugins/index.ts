import { type App } from "vue"
import { loadElementPlus } from "./element-plus"
import { loadElementPlusIcon } from "./element-plus-icon"
import { loadVueI18n } from "./vue-i18n"

export function loadPlugins(app: App) {
  loadElementPlus(app)
  loadElementPlusIcon(app)
  loadVueI18n(app)
}
