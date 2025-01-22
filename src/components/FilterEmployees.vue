<template>
  <div>
    <q-btn color="primary" label="Filter" @click="showFilterDialog = true" />

    <q-dialog v-model="showFilterDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Select and Apply a Filter</div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="selectedFilter"
            :options="remainingFilters"
            option-label="label"
            option-value="key"
            label="Select a Filter"
            emit-value
            map-options
          />
          <div v-if="selectedFilter">
            <q-input
              v-if="['name', 'department'].includes(selectedFilter)"
              v-model="filters[selectedFilter]"
              label="Enter value"
            />

            <q-select
              v-if="selectedFilter === 'salary'"
              v-model="filterCondition"
              :options="salaryConditions"
              label="Condition"
              emit-value
              map-options
            />
            <q-input
              v-if="selectedFilter === 'salary'"
              v-model.number="filters[selectedFilter]"
              type="number"
              label="Enter salary"
            />

            <q-select
              v-if="selectedFilter === 'gender'"
              v-model="filters[selectedFilter]"
              :options="genderOptions"
              label="Select Gender"
              emit-value
              map-options
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="showFilterDialog = false"
          />
          <q-btn flat label="Add" color="primary" @click="addFilter" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-mt-md">
      <q-chip
        v-for="(filter, key) in selectedFilters"
        :key="key"
        removable
        @remove="removeFilter(key)"
      >
        {{ filterOptions.find((opt) => opt.key === key)?.label }}:
        {{ key === 'salary' ? `${salaryConditions.find((opt) => opt.value === filter.condition)?.label} ${filter.value}` : filter.value }}
      </q-chip>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useEmployeeStore } from "@/stores/employee";
import { toast } from 'vue-sonner'

const selectedFilter = ref(null);
const filters = ref({
  name: "",
  department: "",
  salary: "",
  gender: "",
});
const selectedFilters = ref({});
const showFilterDialog = ref(false);

const filterOptions = [
  { label: "Name", key: "name" },
  { label: "Department", key: "department" },
  { label: "Salary", key: "salary" },
  { label: "Gender", key: "gender" },
];

const remainingFilters = computed(() => {
  return filterOptions.filter(
    (option) => !(option.key in selectedFilters.value)
  );
});

const employeeStore = useEmployeeStore();

const employees = ref(employeeStore.employees);

const filteredEmployees = computed(() => {
  return employees.value.filter((employee) => {
    return Object.entries(selectedFilters.value).every(
      ([key, { value, condition }]) => {
        if (key === "name" || key === "department") {
          return employee[key].toLowerCase().includes(value.toLowerCase());
        }
        if (key === "salary") {
          const salary = Number(employee[key]);
          const filterValue = Number(value);
          if (condition === "equal") return salary === filterValue;
          if (condition === "lte") return salary <= filterValue;
          if (condition === "gte") return salary >= filterValue;
        }
        if (key === "gender") {
          return employee[key]?.toLowerCase() === value.toLowerCase();
        }

        return true;
      }
    );
  });
});

const emit = defineEmits(["updateFilteredEmployees"]);

const salaryConditions = [
  { label: "Equal to", value: "equal" },
  { label: "Less than or equal", value: "lte" },
  { label: "Greater than or equal", value: "gte" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const filterCondition = ref(null);

function addFilter() {
  if (selectedFilter.value && filters.value[selectedFilter.value] !== "") {
    const filterValue = filters.value[selectedFilter.value];
    const condition = selectedFilter.value === 'salary' ? filterCondition.value : null;

    selectedFilters.value[selectedFilter.value] = {
      condition,
      value: filterValue,
    };

    filters.value[selectedFilter.value] = "";
    selectedFilter.value = null;
    filterCondition.value = null;
    showFilterDialog.value = false;

    emit("updateFilteredEmployees", filteredEmployees.value);
  } else {
    toast('Warning', {
      description: 'No filter selected or value is empty.',
      type: 'warning',
    })
  }
}

function removeFilter(key) {
  delete selectedFilters.value[key];
  emit("updateFilteredEmployees", filteredEmployees.value);
}
</script>
