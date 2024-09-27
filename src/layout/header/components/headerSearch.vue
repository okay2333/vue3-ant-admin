<script setup lang="ts">
import icon from '@/components/icon.vue'
import { ref } from 'vue'
const search = ref()
const headerSearchSelectRef = ref()
const handleChange = () => {
  console.log('handleChange')
}
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}
const isShow = ref(false)

// 模糊搜索
import Fuse from 'fuse.js'
/**
 * 搜索库相关
 */
const list = [
  {
    path: '/my',
    title: ['个人中心']
  },
  {
    path: '/user',
    title: ['用户']
  },
  {
    path: '/user/manage',
    title: ['用户', '用户管理']
  },
  {
    path: '/user/info',
    title: ['用户', '用户信息']
  },
  {
    path: '/article',
    title: ['文章']
  },
  {
    path: '/article/ranking',
    title: ['文章', '文章排名']
  },
  {
    path: '/article/create',
    title: ['文章', '创建文章']
  }
]
const fuse = new Fuse(list, {
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

const handleSearch = (query: any) => {
  console.log(fuse.search(query))
}
</script>
<template>
  <div :class="{ show: isShow }" class="headerSearch">
    <icon icon-name="search" :size="25" @click.stop="onShowClick" class="search-icon" />
    <a-select
      class="header-search-select"
      ref="headerSearchSelectRef"
      v-model:value="search"
      @change="handleChange"
      @search="handleSearch"
      show-search
      :filter-option="false"
      :show-arrow="false"
    >
      <!-- <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
    </a-select>
  </div>
</template>
<style scoped>
.headerSearch {
  .search-icon {
    vertical-align: middle;
  }
  .header-search-select {
    /* font-size: 18px; */
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    /* border-radius: 0; */
    /* display: inline-block; */
    vertical-align: middle;
    ::v-deep .ant-select-selector {
      background-color: red;
    }
    /* ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    } */
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
