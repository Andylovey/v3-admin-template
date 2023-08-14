<script lang="ts" setup>
import { DEFAULT_LOCALE, LocaleLang } from "@/constants/local-storage-key"
import { getCachedLocale, setCachedLocale } from "@/utils/cache/local-storage"
import { reactive, ref } from "vue"
import { useI18n } from "vue-i18n"

const { locale } = useI18n()

const activeLocaleName = ref<LocaleLang>(getCachedLocale() || DEFAULT_LOCALE)
const localeList = reactive<{ localeStr: LocaleLang }[]>([{ localeStr: "zh" }, { localeStr: "en" }])

const setLocale = (lang: LocaleLang) => {
  setCachedLocale(lang)
  locale.value = lang
  activeLocaleName.value = lang
}
</script>

<template>
  <el-dropdown trigger="click" @command="setLocale">
    <div>
      <el-tooltip effect="dark" :content="$t('语言')" placement="bottom">
        <el-icon :size="20">
          <Switch />
        </el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(locale, index) in localeList"
          :key="index"
          :disabled="activeLocaleName === locale.localeStr"
          :command="locale.localeStr"
        >
          <span>{{ locale.localeStr }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
