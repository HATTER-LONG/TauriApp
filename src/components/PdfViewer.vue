<template>
  <div class="pdf-container">
    <canvas ref="pdfCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as pdfjs from 'pdfjs-dist'
import { readFile } from '@tauri-apps/plugin-fs'
// 定义 props
interface Props {
  fileUrl: string
}
const props = defineProps<Props>()

// 设置 PDF.js worker 路径
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`

const pdfCanvas = ref<HTMLCanvasElement | null>(null)

const renderPdf = async (url: string) => {
  try {
    if (!pdfCanvas.value) return
    // 使用 Tauri fs plugin 读取文件
    const fileContent = await readFile(url)

    // 从 Tauri 本地文件路径加载 PDF
    const loadingTask = pdfjs.getDocument({ data: fileContent })
    const pdf = await loadingTask.promise

    // 获取第一页
    const page = await pdf.getPage(1)

    // 设置缩放和画布
    const viewport = page.getViewport({ scale: 1.5 })
    const canvas = pdfCanvas.value
    const context = canvas.getContext('2d')

    if (!context) return

    canvas.height = viewport.height
    canvas.width = viewport.width

    // 渲染 PDF 页面
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise
  } catch (error) {
    console.error('Error rendering PDF:', error)
  }
}

// 监听 fileUrl 变化
watch(
  () => props.fileUrl,
  (newUrl) => {
    if (newUrl) {
      void renderPdf(newUrl)
    }
  },
)

onMounted(() => {
  if (props.fileUrl) {
    void renderPdf(props.fileUrl)
  }
})
</script>

<style scoped>
.pdf-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  padding: 20px;
}

canvas {
  max-width: 100%;
  height: auto;
}
</style>
