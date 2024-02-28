<script setup>
import {
  RouterView,
  //  useRoute,
  useRouter,
} from 'vue-router'

const router = useRouter()

const list = [
  {
    name: 111,
    click: () => {
      router.push({
        name: 'test',
      })
    },
  },
  {
    name: 222,
  },
]
</script>

<script>
</script>

<template>
  <div class="index">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
    <div v-for="(item, index) in list" :key="index" @click="item.click">
      {{ item.name }}
    </div>
  </div>
</template>
