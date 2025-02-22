<template>
  <q-page class="row items-center justify-evenly column">
    <q-btn color="primary" label="选择 PDF 文件" @click="handleFileOpen" />
    <!-- PDF 预览组件 -->
    <pdf-viewer v-if="pdfUrl" :fileUrl="pdfUrl" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { open } from '@tauri-apps/plugin-dialog'
import PdfViewer from 'components/PdfViewer.vue'

const pdfUrl = ref('')

const handleFileOpen = async () => {
  try {
    const selected = await open({
      filters: [{ name: 'PDF', extensions: ['pdf'] }],
      multiple: false,
    })

    if (selected && typeof selected === 'string') {
      // 将本地文件路径转换为 URL
      pdfUrl.value = selected
    }
  } catch (error) {
    console.error('Failed to open file:', error)
  }
}
</script>

<style></style>
