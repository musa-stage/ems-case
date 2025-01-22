<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Department Statistics</div>
          </q-card-section>
          <q-card-section class="full-height">
            <Chart
              type="bar"
              :data="chartData"
              :options="chartOptions"
              class="chart"
            />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEmployeeStore } from "@/stores/employee";
import Chart from "primevue/chart";
import { useRouter } from "vue-router";

const employeeStore = useEmployeeStore();
const router = useRouter();

const departments = ref([]);
const chartData = ref([]);
const chartOptions = ref([]);

onMounted(() => {
  const departmentMap = new Map();
  employeeStore.employees.forEach((employee) => {
    if (employee.department) {
      if (!departmentMap.has(employee.department)) {
        departmentMap.set(employee.department, 0);
      }
      departmentMap.set(
        employee.department,
        departmentMap.get(employee.department) + 1
      );
    }
  });
  departments.value = Array.from(departmentMap.keys());
  chartData.value = setChartData(departmentMap);
  chartOptions.value = setChartOptions();
});

const setChartData = (departmentMap) => {
  return {
    labels: Array.from(departmentMap.keys()),
    datasets: [
      {
        label: "Number of Employees",
        data: Array.from(departmentMap.values()),
        backgroundColor: [
          "rgba(249, 115, 22, 0.2)",
          "rgba(6, 182, 212, 0.2)",
          "rgb(107, 114, 128, 0.2)",
          "rgba(139, 92, 246, 0.2)",
        ],
        borderColor: [
          "rgb(249, 115, 22)",
          "rgb(6, 182, 212)",
          "rgb(107, 114, 128)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    responsive: true,
    maintainAspectRatio: false,
    onClick: handleChartClick,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const handleChartClick = (event, elements) => {
  if (elements.length > 0) {
    const chartElement = elements[0];
    const departmentIndex = chartElement.index;
    const departmentName = chartData.value.labels[departmentIndex];
    const formattedDepartmentName = departmentName
      .replace(/\s+/g, "-")
      .toLowerCase();
    router.push(`/departments/${formattedDepartmentName}`);
  }
};
</script>

<style scoped>
.table-card {
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.my-card {
  min-height: calc(100vh - 30px);
}

.chart {
  width: 100%;
  height: 400px;
  cursor: pointer;
}
</style>
