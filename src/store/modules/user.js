import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    role: '',
    roleName: '',
  }),

  getters: {
    userInfo(state) {
      return { ...state }
    },
  },

  actions: {
    login() {
    },
    logout() {
    },
    setInfo(partial) {
      this.$patch(partial)
    },
    resetInfo() {
      this.$reset()
    },
    getUserInfo() {
    },
  },
})

export default useUserStore
