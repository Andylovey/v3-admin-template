<script lang="ts" setup>
import { computed, watchEffect } from "vue"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import useResize from "./hooks/useResize"
import LeftMode from "./LeftMode.vue"
import { DeviceEnum } from "@/constants/app-key"
import { getCssVariableValue, setCssVariableValue } from "@/utils"

/** Layout 布局响应式 */
useResize()

const appStore = useAppStore()
const settingsStore = useSettingsStore()

//#region 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVariableName = "--v3-tagsview-height"
const v3TagsviewHeight = getCssVariableValue(cssVariableName)
watchEffect(() => {
  // showTagsView.value
  //   ? setCssVariableValue(cssVariableName, v3TagsviewHeight)
  //   : setCssVariableValue(cssVariableName, "0px")
  setCssVariableValue(cssVariableName, v3TagsviewHeight)
})
//#endregion
</script>

<template>
  <div>
    <!-- 左侧模式 -->
    <LeftMode />
  </div>
</template>

<style lang="scss" scoped>
</style>
