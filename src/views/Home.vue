<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="home-page">
        <q-card flat bordered class="overview-card">
          <q-card-section>
            <div class="overview-metrics">
              <div>Total Employees: 120</div>
              <div>Departments: 5</div>
              <div>Recent Hires: 3</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="announcements-card">
          <q-card-section>
            <h3>Announcements</h3>
            <p>Welcome our new team members!</p>
            <ul>
              <li>Team building event on Friday</li>
              <li>Office renovation starting next month</li>
              <li>New project launch next week</li>
            </ul>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="charts-card">
          <q-card-section>
            <h3>Employee Growth</h3>
            <div class="chart-placeholder">
              <DummyChartData />
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import DummyChartData from '../mocks/DummyChartData.vue';
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
}

.overview-card, .announcements-card, .charts-card {
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.overview-metrics {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.charts-card {
  flex: 1;
}

.chart-placeholder {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
