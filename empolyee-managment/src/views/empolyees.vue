<template>
  <div>
    <!-- Display employees data here -->
    <DataTable
      :headers="tableHeaders"
      :data="tableData"
      :searchable="false"
      :filtrable="false"
      modelName="employee"
    >
      <template #actions="{ row }">
        <el-dropdown trigger="click" v-if="userRole !== 'USER'">
          <span class="el-dropdown-link">
            <!-- Use the imported More icon from element-plus -->
            <el-icon :size="20">
              <More />
            </el-icon>
          </span>
          <!-- Dropdown menu directly inside el-dropdown -->
          <template v-slot:dropdown>
            <el-dropdown-menu style="background-color: #172b4d">
              <el-dropdown-item class="text-white" @click="editRow(row)"
                >Edit</el-dropdown-item
              >
              <el-dropdown-item class="text-white" @click="deleteRow(row)"
                >Delete</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
  ElMessage,
} from "element-plus";
import DataTable from "./components/DataTable.vue";
import { More } from "@element-plus/icons-vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const tableHeaders = ref([
  { label: "User Name", value: "userName" },
  { label: "Email", value: "email" },
  { label: "Phone Number", value: "phoneNumber" },
  { label: "Education Level", value: "educationLevel" },
]);

const store = useStore();
const tableData = ref([]);
const userRole = JSON.parse(localStorage.getItem("userRole"));

const fetchEmployees = async () => {
  try {
    const response = await store.dispatch("employees/fetchEmployeesData");
    tableData.value = response;
  } catch (error) {
    console.error("Error loading employees:", error);
  }
};

const deleteRow = async (row) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        store.dispatch("employees/deleteEmployee", row.id).then(() => {
          fetchEmployees();
          Swal.fire("Deleted!", "The employee has been deleted.", "success");
        });
      }
    });
  } catch (error) {
    ElMessage.error("Error deleting employee.");
    console.error("Error:", error);
  }
};

const editRow = (row) => {
  router.push(`/employee/edit/${row.id}`);
};

onMounted(() => {
  fetchEmployees();
});
</script>

<style>
.filter-card {
  padding: 20px;
  margin-bottom: 20px;
  background-color: inherit;
  border-radius: 8px;
}
</style>
