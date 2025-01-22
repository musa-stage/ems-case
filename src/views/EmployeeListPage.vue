<template>
  <q-layout>
    <q-page-container window-height>
      <q-page padding class="page-container" v-if="!loading">
        <q-card flat bordered>
          <q-card-section>
            <FilterEmployees
              @updateFilteredEmployees="updateFilteredEmployees"
            />
          </q-card-section>
        </q-card>
        <EmployeeList :employees="filteredEmployees" />
      </q-page>
      <q-page v-else>
        <q-card flat bordered>
          <q-card-section  class="loading-message">
            <q-inner-loading :showing="true">
              <q-spinner-gears size="50px" color="secondary" />
            </q-inner-loading>
            <h4>We are loading your data...</h4>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useEmployeeStore } from "@/stores/employee";
import EmployeeList from "../components/EmployeeList.vue";
import FilterEmployees from "../components/FilterEmployees.vue";

const employeeStore = useEmployeeStore();
const filteredEmployees = ref(employeeStore.employees);
const employees = ref([]);

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  employees.value = employeeStore.employees;
});

function updateFilteredEmployees(newFilteredEmployees) {
  filteredEmployees.value = newFilteredEmployees;
}

watch(
  () => employeeStore.employees,
  (newEmployees) => {
    filteredEmployees.value = newEmployees;
  },
  { deep: true }
);
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.loading-message {
  height: 100dvh;
}
</style>
