<template>
  <div class="titlebar" data-tauri-drag-region>
    <div class="titlebar-logo">
      <img src="../assets/app-icon.png" alt="Logo" width="16" height="16" />
      <span>我的应用</span>
    </div>
    <div class="titlebar-controls">
      <button @click="minimize" class="titlebar-button">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M2 6h8v1H2z" />
        </svg>
      </button>
      <button @click="toggleMaximize" class="titlebar-button">
        <svg v-if="!isMaximized" width="12" height="12" viewBox="0 0 12 12">
          <path
            d="M2 2v8h8V2H2zm1 1h6v6H3V3z"
          />
        </svg>
        <svg v-else width="12" height="12" viewBox="0 0 12 12">
          <path
            d="M2 2v2h2V2H2zm6 0v2h2V2H8zM2 8v2h2V8H2zm6 0v2h2V8H8z"
          />
        </svg>
      </button>
      <button @click="close" class="titlebar-button close">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path
            d="M2.4 1L1 2.4l3.6 3.6L1 9.6 2.4 11l3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L11 2.4 9.6 1 6 4.6 2.4 1z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

const isMaximized = ref(false);

onMounted(async () => {
  isMaximized.value = await appWindow.isMaximized();
  
  // 监听窗口状态变化
//   appWindow.onResized(() => {
//     appWindow.isMaximized().then(maximized => {
//       isMaximized.value = maximized;
//     });
//   });
});

const minimize = () => {
  appWindow.minimize();
};

const toggleMaximize = async () => {
  await appWindow.toggleMaximize();
  isMaximized.value = await appWindow.isMaximized();
};

const close = () => {
  appWindow.close();
};
</script>

<style scoped>
.titlebar {
  height: 32px;
  background-color: #1f1f1f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.titlebar-logo {
  display: flex;
  align-items: center;
  padding-left: 10px;
  gap: 8px;
  font-size: 14px;
  color: #fff;
}

.titlebar-controls {
  display: flex;
}

.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 32px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  fill: #fff;
}

.titlebar-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.close:hover {
  background-color: #e81123;
}

[data-tauri-drag-region] {
  cursor: move;
}
</style>
