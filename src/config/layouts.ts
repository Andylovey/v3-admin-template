import { getConfigLayout } from "@/utils/cache/local-storage"

/** 项目配置 */
export interface LayoutSettings {
  /** 是否缓存标签栏 */
  cacheTagsView: boolean
}

export const layoutSettings: LayoutSettings = getConfigLayout() ?? {
  cacheTagsView: false,
}
