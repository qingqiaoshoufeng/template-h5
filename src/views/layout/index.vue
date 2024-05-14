<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed, provide } from 'vue'
import extraRoutes from '#/router/modules/extraRoutes'

const route = useRoute()
const router = useRouter()

const listMap = extraRoutes.reduce((current, item) => {
  if (item.meta.pageGroup) {
    !current[item?.meta?.pageGroup] && (current[item?.meta?.pageGroup] = [])
    current[item?.meta?.pageGroup].push({
      ...item,
      click: () => {
        router.push({
          name: item.name,
        })
      },
    })
  }
  return current
}, {})

const list = computed(() => {
  return listMap[route?.meta?.pageGroup]
})
provide('tabBarList', list)
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
    <div v-if="!route?.meta?.hideInMenu" class="bar-wrapper">
      <div v-for="(item, index) in list" :key="index" @click="item.click">
        {{ item?.meta?.title }}
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
