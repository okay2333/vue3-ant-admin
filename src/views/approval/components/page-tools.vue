<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  showBefore: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <a-card class="page-tools">
    <a-row justify="space-between" align="middle">
      <template v-if="showBefore">
        <a-col>
          <div class="before">
            <a-icon type="info-circle" />
            <slot name="before" />
          </div>
        </a-col>
      </template>
      <a-col>
        <a-row justify="end">
          <slot name="after" />
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<style scoped lang="scss">
.page-tools {
  margin: 10px 0;
  .before {
    line-height: 34px;
    .anticon {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>
