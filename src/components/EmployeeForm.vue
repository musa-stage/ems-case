<template>
  <q-form>
    <q-input v-model="form.name" label="Name" outlined />
    <q-input v-model="form.department" label="Department" outlined />
    <q-input v-model.number="form.age" label="Age" outlined type="number" />
    <q-input v-model.number="form.salary" label="Salary" outlined type="number" />
    <q-input v-model="form.location" label="Location" outlined />
    <q-select v-model="form.gender" :options="['Male', 'Female']" label="Gender" outlined />
  </q-form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useEmployeeStore } from '@/stores/employee';

const props = defineProps({
  employeeData: Object,
  editMode: Boolean,
});

const employeeStore = useEmployeeStore();
const form = ref({ ...props.employeeData });

watch(() => props.employeeData, (newVal) => {
  if (newVal) {
    form.value = { ...newVal };
  } else {
    form.value = { name: '', department: '', age: null, salary: null, location: '', gender: '' };
  }
});

watch(form, (newForm) => {
  employeeStore.setSelectedEmployee(newForm);
}, { deep: true });
</script>
