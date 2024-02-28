<script setup>
import {
  RouterView,
  //  useRoute, useRouter
} from 'vue-router'
import { computed } from 'vue'

// import HelloWorld from './components/HelloWorld.vue'
import extraRoute from '#/router/modules/extraRoutes.js'

const isExtraPage = computed(() => {
  const pages = Object.values(extraRoute).map(item => item.path)
  return pages.includes(item)
})
</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
