import { ref, toRaw } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import { flatMultiLevelRoutes } from "@/router/helper"
import routeSettings from "@/config/route"
//引入所有views下.vue文件
const modules = import.meta.glob("@/**/**.vue")
console.log("modules", modules)

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  const routeRoles = route.meta?.roles
  return routeRoles ? roles.some((role) => routeRoles.includes(role)) : true
}

// const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
//   const res: RouteRecordRaw[] = []
//   routes.forEach((route) => {
//     const tempRoute = { ...route }
//     if (hasPermission(roles, tempRoute)) {
//       if (tempRoute.children) {
//         tempRoute.children = filterAsyncRoutes(tempRoute.children, roles)
//       }
//       res.push(tempRoute)
//     }
//   })
//   console.log("init for", res)
//   return res
// }

const filterAsyncMenus = (routes: any[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const formatRoute = {
      ...route,
      component:
        // route.parentId === "0"
        route.component.includes("layout")
          ? modules[`/src/${route.component}.vue`]
          : modules[`/src/views/${route.component}.vue`]
    }
    const tempRoute = { ...formatRoute }
    if (tempRoute.children) {
      tempRoute.children = filterAsyncMenus(tempRoute.children)
    }
    res.push(tempRoute)
  })
  return res
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (originRoutes: any) => {
    // const accessedRoutes = routeSettings.async ? filterAsyncRoutes(asyncRoutes, roles) : asyncRoutes
    // routes.value = constantRoutes.concat(accessedRoutes)
    // dynamicRoutes.value = routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(accessedRoutes) : accessedRoutes
    const accessedRoutes = filterAsyncMenus(originRoutes)
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(accessedRoutes) : accessedRoutes
  }

  // console.log("routes", routes, dynamicRoutes)

  return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
