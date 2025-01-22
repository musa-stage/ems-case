<template>
  <div>
    <q-table
      :rows="props.employees"
      row-key="id"
      :columns="columns"
      flat
      bordered
      binary-state-sort
      :rows-per-page-options="[10, 25, 50, 100]"
      :rows-per-page="10"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            icon="visibility"
            @click="viewEmployee(props.row)"
          ></q-btn>
          <q-btn flat icon="edit" @click="editEmployee(props.row)"></q-btn>
          <q-btn
            flat
            icon="delete"
            color="negative"
            @click="deleteEmployee(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <div class="q-py-md buttons-container">
      <q-btn
        icon="add"
        label="Add Employee"
        color="primary"
        @click="openAddModal"
      />
      <q-btn
        icon="refresh"
        label="Update Employee List From API"
        color="secondary"
        @click="updateEmployeeList"
      />
    </div>
    <q-dialog v-model="showModal">
      <q-card style="min-width: 400px; max-width: 600px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            {{ editMode ? "Edit Employee" : "Add New Employee" }}
          </div>
        </q-card-section>
        <q-card-section>
          <EmployeeForm
            :employeeData="selectedEmployee"
            :editMode="editMode"
            @close="showModal = false"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn
            flat
            color="primary"
            :label="editMode ? 'Update' : 'Add'"
            @click="handleSubmit"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showDeleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Deletion</div>
          <div>Are you sure you want to delete this employee?</div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cancel" @click="showDeleteDialog = false" />
          <q-btn flat color="negative" label="Delete" @click="confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useEmployeeStore } from "@/stores/employee";
import { useRouter } from "vue-router";
import { ref, watch, computed, onMounted } from "vue";
import EmployeeForm from "./EmployeeForm.vue";

const employeeStore = useEmployeeStore();

const router = useRouter();

const props = defineProps({
  employees: Array,
});

const columns = [
  { name: "id", label: "ID", field: "id", sortable: true },
  { name: "name", label: "Name", field: "name", sortable: true },
  {
    name: "department",
    label: "Department",
    field: "department",
    sortable: true,
  },
  { name: "age", label: "Age", field: "age", sortable: true },
  { name: "salary", label: "Salary", field: "salary", sortable: true },
  { name: "location", label: "Location", field: "location", sortable: true },
  { name: "gender", label: "Gender", field: "gender", sortable: true },
  { name: "actions", label: "Actions", field: "actions" },
];

const showModal = ref(false);
const selectedEmployee = ref(null);
const editMode = ref(false);
const showDeleteDialog = ref(false);
const employeeToDelete = ref(null);

const emit = defineEmits(["edit"]);

function editEmployee(employee) {
  selectedEmployee.value = { ...employee };
  editMode.value = true;
  showModal.value = true;
}

function openAddModal() {
  selectedEmployee.value = null;
  editMode.value = false;
  showModal.value = true;
}

function viewEmployee(employee) {
  employeeStore.setSelectedEmployee(employee);
  router.push({ path: `/employees/${employee.id}` });
}

function deleteEmployee(id) {
  employeeToDelete.value = id;
  showDeleteDialog.value = true;
}

function confirmDelete() {
  employeeStore.deleteEmployee(employeeToDelete.value);
  employeeToDelete.value = null;
  showDeleteDialog.value = false;
}

function handleSubmit() {
  if (editMode.value) {
    employeeStore.updateEmployee(employeeStore.selectedEmployee);
  } else {
    employeeStore.addEmployee(employeeStore.selectedEmployee);
  }
  employeeStore.setSelectedEmployee(null);
  showModal.value = false;
}

function updateEmployeeList() {
  employeeStore.fetchAndUpdateEmployees();
}
</script>

<style scoped>
.buttons-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}
</style>
