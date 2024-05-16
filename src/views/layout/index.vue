<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed, provide } from 'vue'
import extraRoutes from '#/router/modules/extraRoutes'
import userSettings from '#/utils/getUserSettings.js'

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
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  const result = listMap[route?.meta?.pageGroup]?.sort((a, b) => {
    return (a?.meta?.sort - b?.meta?.sort)
  })
  return result
})

const barConfig = computed(() => {
  const customBar = userSettings?.barConfig?.components[route?.meta?.customBar]
  return {
    components: customBar,
    ...route?.meta || {},
  }
})
provide('tabBarList', list)
provide('extraRoutes', extraRoutes)
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
    <div v-if="!route?.meta?.hideInMenu" class="bar-wrapper" :style="barConfig.barStyle || {}">
      <template v-if="!barConfig.components">
        <div v-for="(item, index) in list" :key="index" @click="item.click">
          {{ item?.meta?.title }}
        </div>
      </template>
      <component :is="barConfig.components" v-else />
    </div>
  </div>
</template>

<style lang="less" scoped>
.lay-out{
  display: flex;
  flex-direction: column;
  height: 100%;
  .content{
    flex:1;
  }
  .bar-wrapper{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
