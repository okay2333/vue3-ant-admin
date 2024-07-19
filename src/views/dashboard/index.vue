<script setup lang="ts">
import { ref } from 'vue'
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
        <a-card>
          <p>card content</p>
        </a-card>
        <a-card>
          <p>card content</p>
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
