// import userSettings from '#/utils/getUserSettings.js'
import { isType } from './type'
import userSettingss from '@/config/project-config.mjs'

const userSettings = isType(userSettingss, 'function') ? userSettingss({ env: import.meta.env }) : userSettingss

const TOKEN_KEY = userSettings.tokenKeyName || 'token'

function isLogin() {
  return !!localStorage.getItem(TOKEN_KEY)
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export { isLogin, getToken, setToken, clearToken }
