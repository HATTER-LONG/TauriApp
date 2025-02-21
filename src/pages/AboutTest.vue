<template>
  <q-page padding>
    <div class="column items-center q-gutter-y-md">
      <h4>测试页面</h4>
      <q-card class="my-card" style="max-width: 500px">
        <q-card-section>
          <div class="text-h6">这是一个测试卡片</div>
          <div class="text-subtitle2">包含一些测试功能</div>
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" label="测试按钮" @click="count++" />
          <div class="q-mt-md">点击次数: {{ count }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>
