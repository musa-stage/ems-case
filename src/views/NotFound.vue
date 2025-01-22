<template>
  <div class="not-found-container">
    <h1>Oops! Page Not Found</h1>
    <p>We can't seem to find the page you're looking for.</p>
    <q-btn color="primary" @click="goHome">Go Back Home</q-btn>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/');
}
</script>


<style lang="scss" scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  color: #343a40;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  .q-btn {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
}
</style>