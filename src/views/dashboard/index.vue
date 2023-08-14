<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
import Admin from "./components/Admin.vue"
import Editor from "./components/Editor.vue"
import { onMounted } from "vue";

const userStore = useUserStore()
const isAdmin = userStore.roles.includes("admin")

onMounted(() => {
  console.log('Mounted Dashboard')
})
</script>


<!-- <component :is="isAdmin ? Admin : Editor" /> -->
<template>
    <h1>{{ $t('语言') }}</h1>
</template>