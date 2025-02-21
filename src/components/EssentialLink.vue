<template>
  <q-item
    clickable
    :tag="isExternal ? 'a' : 'div'"
    :target="isExternal ? '_blank' : undefined"
    :href="isExternal ? link : undefined"
    @click="isExternal ? undefined : navigateTo(link || '')"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <!-- <q-item-label caption>{{ caption }}</q-item-label> -->
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  isExternal?: boolean;
}

const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  isExternal: false
});

const router = useRouter();
const isExternal = computed(() => props.isExternal);

const navigateTo = async (path: string) => {
  try {
    await router.push(path);
  } catch (error) {
    console.error('Failed to navigate:', error);
  }
};
</script>
