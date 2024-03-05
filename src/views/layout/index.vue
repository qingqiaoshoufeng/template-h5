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
    click: () => {
      router.push({
        name: 'test2',
      })
    },
  },
]
</script>

<script>
</script>

<template>
  <div class="lay-out">
    <div class="content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </div>
    <div class="bar-wrapper">
      <div v-for="(item, index) in list" :key="index" @click="item.click">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.lay-out{
  display: flex;
  flex-direction: column;
  height: 100%;
  .content{
    height: 100%;
  }
  .bar-wrapper{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
