<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { Dayjs } from 'dayjs'
import countTo from '@/components/countTo.vue'
import Sider from '@/layout/sider/index.vue'
const value = ref<Dayjs>()
const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode)
  console.log(countTo)
  console.log(Sider)
}

interface UserType {
  name: string
  avatar: string
  company: string
  depart: string
  position: string
}
const user = ref<UserType>({
  name: '管理员',
  avatar: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
  company: '福建鲍勃科技股份有限公司',
  depart: '通讯部',
  position: '技术员'
})

interface newsType {
  title: string
  content: string
  date: string
}
const newsList = ref<newsType[]>([
  {
    title: 'Breaking News Breaking News Breaking News',
    content: 'Some breaking news content',
    date: '2024-07-18'
  },
  {
    title: 'Breaking News Breaking News Breaking News',
    content: 'Some breaking news content',
    date: '2024-07-18'
  },
  {
    title: 'Breaking News Breaking News Breaking News',
    content: 'Some breaking news content',
    date: '2024-07-18'
  }
])
import * as echarts from 'echarts'
let chartInstance = null
// 创建一个响应式引用来保存DOM元素
const chartDom = ref(null)
// 初始化ECharts实例并设置配置项（这里以折线图为例，但可灵活替换）
onMounted(async () => {
  await nextTick() // 确保DOM已经渲染完成
  chartInstance = echarts.init(chartDom.value)
  const option = {
    // 这里是ECharts的配置项，可以根据需要绘制不同类型的图表
    title: {},
    tooltip: {},
    xAxis: {
      data: ['类别1', '类别2', '类别3', '类别4', '类别5']
    },
    yAxis: {},
    series: [
      {
        name: '数据系列',
        type: 'line', // 这里可以是'line'、'bar'、'pie'等，根据图表类型选择
        data: [120, 200, 150, 80, 70]
      }
    ]
  }
  chartInstance.setOption(option)

  getHomeData()
})

import { getHomeData as getHomeDataApi } from '@/api/home'
const homeData = ref()
const getHomeData = async () => {
  homeData.value = await getHomeDataApi()
}
</script>

<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <!-- 个人信息 -->
        <a-card class="user_info">
          <!-- 公司信息 -->
          <a-flex>
            <a-avatar shape="square" size="large" :src="user.avatar"> </a-avatar>
            <div class="company-info">
              {{ user.company }}
              <div class="depart">
                {{ user.name }}&nbsp;&nbsp;|&nbsp;&nbsp; {{ user.depart }}-{{ user.position }}
              </div>
            </div>
          </a-flex>
          <!-- 代办事项 -->
          <a-flex wrap="wrap">
            <div class="todo_item">
              <span>组织总人数</span>
              <span><countTo :startVal="0" :endVal="699" :duration="2000"></countTo></span>
            </div>
            <div class="todo_item">
              <span>组织总人数</span>
              <span><countTo :startVal="0" :endVal="157" :duration="2000"></countTo></span>
            </div>
            <div class="todo_item">
              <span>组织总人数</span>
              <span><countTo :startVal="0" :endVal="219" :duration="2000"></countTo></span>
            </div>
            <div class="todo_item">
              <span>组织总人数</span>
              <span><countTo :startVal="0" :endVal="327" :duration="2000"></countTo></span>
            </div>
            <div class="todo_item">
              <span>组织总人数</span>
              <span><countTo :startVal="0" :endVal="200" :duration="2000"></countTo></span>
            </div>
            <div class="todo_item">
              <span>组织总人数</span>
              <span><countTo :startVal="0" :endVal="67" :duration="2000"></countTo></span>
            </div>
            <div class="todo_item">
              <span>接口总访问</span>
              <span><countTo :startVal="0" :endVal="34653" :duration="2000"></countTo></span>
            </div>
          </a-flex>
        </a-card>
        <!-- 快捷路口 -->
        <a-card class="short_cut">
          <a-flex vertical>
            <div>快捷路口</div>
            <div class="short_cut_itemList">
              <div class="short_cut_item">
                <div>
                  <GithubFilled :style="{ fontSize: '40px' }" />
                </div>
                <div style="margin-top: 5px">假期审批</div>
              </div>

              <div class="short_cut_item">
                <div>
                  <GithubFilled :style="{ fontSize: '40px' }" />
                </div>
                <div style="margin-top: 5px">社保管理</div>
              </div>

              <div class="short_cut_item">
                <div>
                  <GithubFilled :style="{ fontSize: '40px' }" />
                </div>
                <div style="margin-top: 5px">角色管理</div>
              </div>

              <div class="short_cut_item">
                <div>
                  <GithubFilled :style="{ fontSize: '40px' }" />
                </div>
                <div style="margin-top: 5px">薪资设置</div>
              </div>

              <div class="short_cut_item">
                <div>
                  <GithubFilled :style="{ fontSize: '40px' }" />
                </div>
                <div style="margin-top: 5px">流程管理</div>
              </div>
            </div>
          </a-flex>
        </a-card>
        <a-card class="social_insurance">
          <div>社保申报人数</div>
          <a-flex>
            <div class="social_left">
              <div class="all_apply">
                <span>申报人数</span>
                <span>215</span>
              </div>
              <div class="apply">
                <div class="apply_item">
                  <span>待申报（人）</span>
                  <span>113</span>
                </div>

                <div class="apply_item">
                  <span>待申报（人）</span>
                  <span>161</span>
                </div>

                <div class="apply_item">
                  <span>待申报（人）</span>
                  <span>23</span>
                </div>
              </div>
            </div>
            <div class="social_right">
              <div ref="chartDom" style="width: 400px; height: 300px"></div>
            </div>
          </a-flex>
        </a-card>
      </div>
      <div class="right">
        <a-card class="help-link">
          <a-flex justify="space-between">
            <a-flex vertical>
              <div>帮助链接</div>
              <div class="help-nav">
                <FileWordFilled :style="{ color: '#276FFB' }" />
                入门指南
              </div>
              <div class="help-nav">
                <FileWordFilled :style="{ color: '#276FFB' }" />
                在线帮助手册
              </div>
              <div class="help-nav">
                <FileWordFilled :style="{ color: '#276FFB' }" />
                联系技术支持
              </div>
              <div class="help-nav">
                <FileWordFilled :style="{ color: '#276FFB' }" />
                添加链接
              </div>
            </a-flex>
            <a-flex :style="{ width: '300px', borderRadius: '4px' }">
              <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
            </a-flex>
          </a-flex>
        </a-card>

        <a-card class="news-public">
          <a-flex vertical>
            <div>消息通知</div>
            <div class="news-item" v-for="news in newsList">
              <p>{{ news.title }}</p>
              <p class="news-date">{{ news.date }}</p>
            </div>
            {{ $t('title') }}
          </a-flex>
        </a-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 10px;
  min-height: calc(100vh - 65px);
  .app-container {
    display: flex;
    .left {
      flex: 50%;
      .user_info {
        .company-info {
          font-size: 16px;
          margin: 0 10px;
          .depart {
            font-size: 14px;
            color: #697086;
            font-weight: 400;
          }
        }
        .todo_item {
          margin: 23px 15px 0;
          height: 69px;
          width: 15%;
          display: flex;
          flex-direction: column;
          :nth-child(1) {
            color: #697086;
            font-size: 14px;
          }
          :nth-child(2) {
            color: #383c4e;
            font-size: 30px;
            font-weight: 500;
          }
        }
      }
      .short_cut {
        .short_cut_itemList {
          display: flex;
          .short_cut_item {
            width: 100px;
            height: 100px;
            margin-top: 8px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .social_insurance {
        .social_left {
          .all_apply {
            display: flex;
            flex-direction: column;
            margin: 10px 15px 10px;
            :nth-child(1) {
              font-size: 14px;
              color: #697086;
            }
            :nth-child(2) {
              font-size: 30px;
              color: #04c9be;
              font-weight: 500;
            }
          }
          .apply {
            width: 220px;
            height: 150px;
            background-color: #f5f6f8;
            border-radius: 5px;
            display: flex;
            flex-wrap: wrap;
            .apply_item {
              display: flex;
              flex-direction: column;
              margin: 5px 0 0 15px;
              :nth-child(1) {
                font-size: 14px;
                color: #697086;
              }
              :nth-child(2) {
                font-size: 30px;
                color: #000000;
                font-weight: 500;
              }
            }
          }
        }
        .social_right {
          font-size: 14px;
        }
      }
    }
    .right {
      width: 40%;
      .help-link {
        .help-nav {
          background: #f5f6f8;
          border-radius: 4px;
          width: 150px;
          height: 45px;
          padding: 10px 10px;
          // line-height: 50%;
          font-size: 14px;
          color: #697086;
          margin-top: 10px;
        }
      }
      .news-public {
        .news-item {
          width: 500px;
          height: 50px;
          font-size: 16px;
          margin-top: 10px;
          border-radius: 4px;
          // background-color: #697086;
          .news-date {
            color: #697086;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
