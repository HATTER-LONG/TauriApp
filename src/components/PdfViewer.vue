<template>
  <div class="pdf-container" ref="containerRef">
    <!-- Canvas elements will be dynamically inserted here -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as pdfjs from 'pdfjs-dist'
import { readFile } from '@tauri-apps/plugin-fs'

const PDFJS = import('pdfjs-dist/build/pdf.worker.mjs')
console.log('PDFJS : ', PDFJS)

interface Props {
  fileUrl: string
}
const props = defineProps<Props>()

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`

const containerRef = ref<HTMLElement | null>(null)

const renderPdf = async (url: string) => {
  try {
    if (!containerRef.value) return

    // Clear previous content
    containerRef.value.innerHTML = ''

    const fileContent = await readFile(url)
    const loadingTask = pdfjs.getDocument({ data: fileContent })
    const pdf = await loadingTask.promise

    // Render all pages
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber)
      const viewport = page.getViewport({ scale: 1.5 })

      // Create canvas element for each page
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) continue

      // Set canvas dimensions
      canvas.height = viewport.height
      canvas.width = viewport.width
      canvas.style.marginBottom = '20px' // Add spacing between pages

      // Add canvas to container
      containerRef.value.appendChild(canvas)

      // Render PDF page
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise
    }
  } catch (error) {
    console.error('Error rendering PDF:', error)
  }
}

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
  width: 95%;
  height: 90vh;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
}

canvas {
  max-width: 100%;
  height: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
}
</style>
