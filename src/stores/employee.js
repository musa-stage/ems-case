import { defineStore } from "pinia";
import mockData from "@/mocks/MOCK_DATA.json";
import { toast } from "vue-sonner";
export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: mockData,
    selectedEmployee: null,
    loading: false,
    error: null,
  }),
  actions: {
    isDuplicateEmployee(employee) {
      return this.employees.some(
        (e) =>
          e.name === employee.name &&
          e.department === employee.department &&
          e.age === employee.age &&
          e.salary === employee.salary &&
          e.location === employee.location &&
          e.gender === employee.gender
      );
    },
    addEmployee(employee) {
      const newId = this.employees.length
        ? this.employees[this.employees.length - 1].id + 1
        : 1;
      if (this.isDuplicateEmployee(employee)) {
        return toast("Error", {
          description: "Employee already exists",
          type: "error",
        });
      }
      this.employees.push({ ...employee, id: newId });

      toast("Success", {
        description: "Employee added successfully",
        type: "success",
      });

      // Make an API call to add the employee
      fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...employee, id: newId }),
      })
        .then((response) => response.json())
        .then((data) => {
          toast("Success", {
            description: "Employee added to database successfully",
            type: "success",
          });
        })
        .catch((error) => {
          this.error = error.message;
          console.error("Error adding employee:", error);
        });
    },
    updateEmployee(employee) {
      if (this.isDuplicateEmployee(employee)) {
        return toast("Error", {
          description: "Employee already exists",
          type: "error",
        });
      }
      const index = this.employees.findIndex((e) => e.id === employee.id);
      if (index !== -1) {
        this.employees[index] = employee;
        toast("Success", {
          description: "Employee added successfully",
          type: "success",
        });

        // Make an API call to update the employee
        fetch(`http://localhost:3000/employees/${employee.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        })
          .then((response) => response.json())
          .then((data) => {
            toast("Success", {
              description: "Employee updated in database successfully",
              type: "success",
            });
          })
          .catch((error) => {
            this.error = error.message;
            console.error("Error updating employee:", error);
          });
      }
    },
    deleteEmployee(id) {
      this.employees = this.employees.filter((e) => e.id !== id);

      toast("Success", {
        description: "Employee deleted successfully",
        type: "success",
      });

      // Make an API call to delete the employee
      fetch(`http://localhost:3000/employees/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          toast("Success", {
            description: "Employee deleted from database successfully",
            type: "success",
          });
        })
        .catch((error) => {
          this.error = error.message;
          console.error("Error deleting employee:", error);
        });
    },
    setSelectedEmployee(employee) {
      this.selectedEmployee = employee;
    },
    clearSelectedEmployee() {
      this.selectedEmployee = null;
    },
    getEmployeeById(id) {
      return this.employees.find((e) => e.id === id);
    },
    async fetchAndUpdateEmployees() {
      this.loading = true;
      try {
        const response = await fetch("http://localhost:3000/employees");
        const data = await response.json();
        this.employees = [];
        data.forEach((employee) => {
          this.addEmployee(employee);
        });
      } catch (error) {
        this.error = error.message;
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      }
    },
  },
});
