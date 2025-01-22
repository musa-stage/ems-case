<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="q-ma-md">
        <q-card>
          <q-card-section
            class="bg-primary text-white"
          >
            <q-btn
              flat
              icon="arrow_back"
              @click="goBack"
              label="Back"
              color="white"
            />
          </q-card-section>
          <q-card-section>
            <div v-if="employee" class="q-mb-md row items-center">
              <q-avatar color="primary" text-color="white">{{
                employee.name.charAt(0)
              }}</q-avatar>
              <div class="q-ml-md">
                <q-list class="employee-details-item">
                  <q-item v-for="(value, key) in editableEmployee" :key="key">
                    <q-item-section>
                      <q-item-label caption>{{ key }}</q-item-label>
                      <q-item-label v-if="!isEditing">{{ value }}</q-item-label>
                      <template v-else>
                        <q-input
                          v-if="key !== 'gender'"
                          v-model="editableEmployee[key]"
                        />
                        <q-select
                          v-else
                          :options="['Male', 'Female']"
                          v-model="editableEmployee[key]"
                        />
                      </template>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <div class="row justify-end q-mb-md">
              <q-btn
                flat
                icon="edit"
                @click="toggleEdit"
                label="Edit"
                v-if="!isEditing"
              />
              <template v-if="isEditing">
                <q-btn
                  flat
                  icon="close"
                  @click="cancelEdit"
                  label="Cancel"
                  color="negative"
                  class="q-mr-sm"
                />
                <q-btn
                  flat
                  icon="check"
                  @click="confirmEdit"
                  label="Confirm"
                  color="positive"
                />
              </template>
              <q-btn
                flat
                icon="delete"
                color="negative"
                @click="confirmDelete"
                label="Delete"
                v-if="!isEditing"
              />
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div class="q-mb-md">
              <h5>Personal Activity</h5>
              <p>Details about personal activities go here...</p>
            </div>
            <div class="q-mb-md">
              <h5>Work Experience</h5>
              <p>Details about work experience go here...</p>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>

  <q-dialog v-model="isDeleteDialogOpen">
    <q-card>
      <q-card-section class="row items-center">
        <q-icon name="warning" color="warning" />
        <span class="q-ml-sm"
          >Are you sure you want to delete this employee?</span
        >
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Delete" color="negative" @click="deleteEmployee" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEmployeeStore } from "@/stores/employee";

const route = useRoute();
const router = useRouter();
const employeeStore = useEmployeeStore();
const employee = ref(employeeStore.selectedEmployee);
const isDeleteDialogOpen = ref(false);
const isEditing = ref(false);
const editableEmployee = ref({ ...employee.value });

onMounted(() => {
  if (!employee.value) {
    const employeeId = Number(route.params.id);
    employee.value = employeeStore.getEmployeeById(employeeId) || null;
    editableEmployee.value = { ...employee.value };
  }
});

onUnmounted(() => {
  employeeStore.clearSelectedEmployee();
});

function toggleEdit() {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    editableEmployee.value = { ...employee.value };
  }
}

function confirmEdit() {
  Object.assign(employee.value, editableEmployee.value);
  employeeStore.updateEmployee(employee.value);
  isEditing.value = false;
}

function confirmDelete() {
  isDeleteDialogOpen.value = true;
}

function deleteEmployee() {
  employeeStore.deleteEmployee(employee.value.id);
  router.push("/");
  isDeleteDialogOpen.value = false;
}

function goBack() {
  router.push("/");
}

function cancelEdit() {
  isEditing.value = false;
  editableEmployee.value = { ...employee.value };
}
</script>

<style scoped>
.q-card {
  margin: auto;
}

.q-item-label {
  font-weight: bold;
}

.q-item-label[caption] {
  font-weight: normal;
  color: #666;
}

.q-avatar img {
  border-radius: 50%;
}

.employee-details-item {
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
