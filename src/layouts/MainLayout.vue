<template>
  <q-layout view="lHh Lpr lFf">
    <app-header title="Verbiverse" @toggle-drawer="toggleLeftDrawer" />
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { EssentialLinkProps } from 'components/models'
import EssentialLink from 'components/EssentialLink.vue'
import AppHeader from 'components/AppHeader.vue'
const linksList: EssentialLinkProps[] = [
  {
    title: '主页',
    caption: '首页',
    icon: 'home',
    link: '/',
    isExternal: false,
  },
  {
    title: '关于1',
    caption: '关于页面',
    icon: 'info',
    link: '/about',
    isExternal: false,
  },
  {
    title: '测试页面',
    caption: '测试功能页面',
    icon: 'science',
    link: '/about-test',
    isExternal: false,
  },
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
    isExternal: true,
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
    isExternal: true,
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
    isExternal: true,
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
    isExternal: true,
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
    isExternal: true,
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
    isExternal: true,
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
    isExternal: true,
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
