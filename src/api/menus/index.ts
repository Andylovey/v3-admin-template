// 模拟后端返回的菜单数据
import menusJson from './menus.json'

/** 模拟接口 */
export function getMenusApi() {
  console.log('请求menus...')
  return new Promise((resolve, reject) => {
    // 模拟接口响应时间 2s
    setTimeout(() => {
      // 模拟接口调用成功
      resolve(menusJson)
    }, 2000)
  })
}
