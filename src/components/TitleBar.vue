<template>
  <div class="title-bar" data-tauri-drag-region>
    <div class="title" data-tauri-drag-region>{{ appName }}</div>
    <div class="window-controls">
      <n-button quaternary circle size="small" @click="minimizeWindow">
        <template #icon>
          <n-icon><MinusOutlined /></n-icon>
        </template>
      </n-button>
      <n-button quaternary circle size="small" @click="toggleMaximize">
        <template #icon>
          <n-icon><FullscreenExitOutlined v-if="isFullscreen"/>
            <FullscreenOutlined v-else /></n-icon>
        </template>
      </n-button>
      <n-button
        quaternary
        circle
        size="small"
        class="close-button"
        @click="closeWindow"
      >
        <template #icon>
          <n-icon><CloseOutlined  /></n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NButton, NIcon } from "naive-ui";
import { CloseOutlined, FullscreenOutlined, FullscreenExitOutlined, MinusOutlined } from "@vicons/antd";
import { getCurrentWindow } from "@tauri-apps/api/window";

const appName = ref("Tauri App");
const appWindow = getCurrentWindow();
const isFullscreen = ref(false);

const updateFullscreenState = async () => {
  isFullscreen.value = await appWindow.isFullscreen();
  console.log(isFullscreen.value);
};

onMounted(() => {
  updateFullscreenState();
});

const minimizeWindow = () => {
  appWindow.minimize();
};

const toggleMaximize = async () => {
  await appWindow.setFullscreen(!isFullscreen.value);
  updateFullscreenState();
};

const closeWindow = () => {
  appWindow.close();
};
</script>

<style scoped>
.title-bar {
  height: 32px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  user-select: none;
  -webkit-user-select: none;
}

.title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.window-controls {
  display: flex;
  gap: 4px;
}

.close-button:hover {
  background-color: #ff4d4f;
  color: white;
}
</style>
