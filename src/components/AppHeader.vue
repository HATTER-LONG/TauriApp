<template>
  <q-header elevated class="app-header">
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleDrawer" />

      <q-toolbar-title>
        {{ props.title }}
      </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>

      <!-- 窗口控制按钮 -->
      <div class="window-controls">
        <q-btn flat round dense icon="remove" @click="minimizeWindow" />
        <q-btn flat round dense icon="crop_square" @click="toggleMaximize" />
        <q-btn flat round dense icon="close" @click="closeWindow" color="red-5" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { getCurrentWindow } from '@tauri-apps/api/window'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Unknow App',
})

const emit = defineEmits(['toggle-drawer'])

function toggleDrawer() {
  emit('toggle-drawer')
}

// Tauri API 操作窗口
async function minimizeWindow() {
  const appWindow = getCurrentWindow()
  await appWindow.minimize()
}

async function toggleMaximize() {
  const appWindow = getCurrentWindow()
  if (await appWindow.isMaximized()) {
    await appWindow.unmaximize()
  } else {
    await appWindow.maximize()
  }
}

async function closeWindow() {
  const appWindow = getCurrentWindow()
  await appWindow.close()
}
</script>

<style scoped>
.app-header {
  -webkit-app-region: drag; /* 使标题栏可拖动 */
}

.app-header .q-btn {
  -webkit-app-region: no-drag; /* 按钮区域不可拖动 */
}

.window-controls {
  display: flex;
  gap: 4px;
}
</style>
