<script setup lang="ts">
import icon from '@/components/icon.vue'
import { ref, computed } from 'vue'
const search = ref()
const headerSearchSelectRef = ref()
const handleChange = (selectedValue: string) => {
  console.log('handleChange', selectedValue)
  router.push(selectedValue)
}
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}
const isShow = ref(false)

// 模糊搜索
import Fuse from 'fuse.js'

// 检索数据源
import { useRouter } from 'vue-router'
import { filterRouters } from '@/utils/route'
import { generateRoutes } from '@/utils/FuseData'
const router = useRouter()
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

const fuse = new Fuse(searchPool.value, {
  // 是否按优先级进行排序
  shouldSort: true,
  // 匹配长度超过这个值的才会被认为是匹配的
  minMatchCharLength: 1,
  // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
  // name：搜索的键
  // weight：对应的权重
  keys: [
    {
      name: 'title',
      weight: 0.7
    },
    {
      name: 'path',
      weight: 0.3
    }
  ]
})

// 搜索结果
const searchOptions = ref()
const handleSearch = (query: any) => {
  if (query !== '') {
    // searchOptions.value = fuse.search(query)
    const results = fuse.search(query)
    // 将结果格式化为 Ant Design Vue 的格式
    searchOptions.value = results.map((result) => ({
      label: joinTitles(result.item.title), // 拼接标题
      value: result.item.path // 使用路径作为值
    }))
  } else {
    searchOptions.value = []
  }
}

const joinTitles = (titles: any) => {
  return titles.join('>') // 根据需要使用不同的分隔符
}
</script>
<template>
  <div :class="{ show: isShow }" class="headerSearch">
    <icon icon-name="search" :size="25" @click.stop="onShowClick" class="search-icon" />
    <a-select
      class="header-search-select"
      ref="headerSearchSelectRef"
      v-model:value="search"
      show-search
      placeholder="input search text"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      :options="searchOptions"
      @search="handleSearch"
      @change="handleChange"
    ></a-select>
  </div>
</template>
<style scoped>
.headerSearch {
  ::v-deep .ant-select-selector {
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid #d9d9d9 !important;
  }
  .search-icon {
    vertical-align: middle;
  }
  .header-search-select {
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    vertical-align: middle;
    margin-left: 10px;
  }

  &.show {
    .header-search-select {
      width: 140px;
      margin-left: 10px;
    }
  }
}
</style>
