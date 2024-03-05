/* eslint-disable no-throw-literal */
import { defineStore } from 'pinia'
import { isArray } from 'lodash-es'
import userSettings from '#/utils/getUserSettings.js'
import { useUserStore } from '#/store'

const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissionCodes: [],
  }),

  getters: {
    permissionData(state) {
      return { ...state }
    },
  },

  actions: {
    setPermissionData(partial) {
      this.$patch(partial)
    },
    resetPermissionData() {
      this.$reset()
    },
    getPermissionData() {
      if (!userSettings?.userApiImplement?.getPermissionData) {
        throw '[Castle] settings.js 未配置 getPermissionData 方法'
      }
      return new Promise((resolve, reject) => {
        userSettings.userApiImplement
          .getPermissionData(useUserStore().$state)
          .then((res) => {
            this.setPermissionData(res)
            resolve()
          })
          .catch((err) => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject()
            throw err
          })
      })
    },
    checkPermission(codes, route) {
      // if (!userSettings?.userApiImplement?.checkPermission) throw "[Castle] settings.js 未配置 checkPermission 方法";
      // return userSettings.userApiImplement.checkPermission(
      //   pick(route, ["name", "path", "meta"]),
      //   this.$state.permissionCodes,
      // );

      if (!isArray(codes)) {
        let errMsg = ''
        if (route) {
          errMsg = `请确保页面 [${route.path}] 的 router -> meta -> permissions 为数组类型 string[]，例如 { meta: { permissions: ['add','editor'] }}`
        }
        else {
          errMsg = '请确保指令 [v-p] 或 [checkPermission] 方法的权限数据为数组类型 string[], 例如v-p="[\'add\',\'editor\']"'
        }
        console.error(`[Castle] ${errMsg}`)

        return false
      }

      const normalArr = [...codes, ...new Set(this.$state.permissionCodes)]
      const setArr = [...new Set(normalArr)]

      return normalArr.length !== setArr.length
    },
  },
})

export default usePermissionStore
