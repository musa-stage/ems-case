<template>
  <q-layout>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </q-item-section>
    </q-item>
    <q-list>
      <q-item clickable v-ripple @click="navigateTo('/')">
        <q-item-section>Home</q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="navigateTo('/employees')">
        <q-item-section>Employees</q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="navigateTo('/departments')">
        <q-item-section>Departments</q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="navigateTo('/settings')">
        <q-item-section>Settings</q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="logout">
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { toast } from 'vue-sonner'

const router = useRouter();

function navigateTo(route) {
  router.push(route);
}

function logout() {
  toast("Success", {
    description: "Logged out clicked. But not implemented yet",
    type: "success",
  });
}
</script>

<style scoped>

</style>

