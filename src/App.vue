<template>
  <q-layout view="lhh lpr lfr">
    <q-header v-if="showHeader" elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <Sidebar />
    </q-drawer>

    <q-page-container class="overflow-auto scroll">
      <router-view />
    </q-page-container>
    <Toaster
      closeButton
      rich-colors
      expand
      position="top-right"
      :toastOptions="{
        style: { padding: '20px' },
      }"
    />
  </q-layout>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Toaster } from "vue-sonner";

const leftDrawerOpen = ref(false);
const windowWidth = ref(window.innerWidth);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const showHeader = computed(() => windowWidth.value < 1016);

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener("resize", updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
}

html,
body,
#q-app,
.q-pa-md {
  height: 100%;
  width: 100%;
}

.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

body {
  margin: 0;
}

#app-header {
  background-color: #333;
  padding: 1rem;
  width: 100%;
  min-width: 250px;
  margin: 0 auto;
}

.router-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100%;
}

.navbar {
  display: flex;
  justify-content: space-around;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  color: #9f9f9f;
}
</style>
