<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="header">
          <q-btn
            label="Back to Departments"
            @click="goBack"
            class="back-button"
          />
        </div>
        <div v-if="employees.length" class="employee-list">
          <h2>Employees in {{ departmentName }}</h2>
          <EmployeeList :employees="employees" />
        </div>
        <div v-else>
          <p>No employees found in this department.</p>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useEmployeeStore } from "@/stores/employee";
import EmployeeList from "@/components/EmployeeList.vue";

const employeeStore = useEmployeeStore();

const route = useRoute();
const router = useRouter();

const departmentName = route.params.departmentName.replace(/-/g, " ");

const employees = computed(() => {
  return employeeStore.employees.filter(
    (employee) =>
      employee.department.toLowerCase() === departmentName.toLowerCase()
  );
});

function goBack() {
  router.push({ name: 'Departments' });
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.back-button {
  margin-right: 10px;
}

.employee-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
