<template>
  <div class="mb-lg-0 mb-4">
    <!-- Card containing the search bar, create button, and page size selection -->
    <div class="card mb-3">
      <div class="p-3 card-header">
        <!-- Horizontal Layout -->
        <div class="d-flex justify-content-between align-items-center w-100">
          <!-- Create Button -->
          <button @click="navigateToCreate" class="btn btn-primary mr-3 mt-3">
            Create {{ modelName }}
          </button>
          <div class="mr-3 w-50">
            <el-input
              v-if="searchable"
              v-model="searchQuery"
              placeholder="Search..."
              prefix-icon="el-icon-search"
              @input="handleSearch"
            />
            <el-select
              v-if="filtrable"
              v-model="filterQuery"
              placeholder="Filter by..."
              class="mt-3 w-100"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="option in filterOptions"
                :key="option.value || option.id"
                :label="option.label || option.name"
                :value="option.value || option.id"
              />
            </el-select>
          </div>
          <!-- Search Bar (Only visible if searchable is true) -->

          <!-- Page Size Select -->
          <div class="d-flex align-items-center">
            <span class="mr-2">Page Size:</span>
            <el-select
              v-model="pagination.pageSize"
              @change="handleSizeChange"
              class="w-32"
              size="small"
            >
              <el-option label="10" :value="10" />
              <el-option label="15" :value="15" />
              <el-option label="20" :value="20" />
              <el-option label="30" :value="30" />
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Component -->
    <div class="card">
      <div class="p-3 pb-0 card-header">
        <div class="d-flex justify-content-between">
          <!-- Title or other content can go here -->
        </div>
      </div>
      <div class="table-responsive">
        <table class="table align-items-center">
          <thead>
            <tr>
              <th
                v-for="header in headers"
                :key="header.value"
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-start px-5"
              >
                <h5 class="mb-0">{{ header.label }}</h5>
              </th>
              <!-- Actions column header -->
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 px-5"
              >
                <h5 class="mb-0">Actions</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in data" :key="index">
              <td
                v-for="header in headers"
                :key="header.value"
                class="px-5 text-start"
              >
                <div class="text-start">
                  <div class="mb-0 text-sm">
                    <h6 class="mb-0">
                      {{ getNestedValue(row, header.value) || "-" }}
                    </h6>
                  </div>
                </div>
              </td>
              <!-- Actions column where the dropdown is rendered -->
              <td class="text-center px-5">
                <slot name="actions" :row="row"></slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination mt-3" v-if="paginationable">
      <el-pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.totalItems"
        layout="prev, pager, next"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ElInput, ElSelect, ElOption, ElPagination } from "element-plus";

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1, // default current page
  },
  pageSize: {
    type: Number,
    default: 10, // default items per page
  },
  totalItems: {
    type: Number,
    default: 0, // default total items
  },
  searchable: {
    type: Boolean,
    default: false, // default total items
  },
  filtrable: {
    type: Boolean,
    default: false, // default total items
  },
  filterOptions: {
    type: Array,
    default: () => [],
  },
  modelName: {
    type: String,
    required: true, // model name for routing
  },
  paginationable: {
    type: Boolean,
    default: true, // default total items
  },
});

const emit = defineEmits([
  "update:currentPage",
  "update:pageSize",
  "update:searchQuery",
  "update:filterQuery",
]);

const router = useRouter();

// Search query state
const searchQuery = ref("");
const filterQuery = ref("");

// Pagination state
const pagination = ref({
  currentPage: props.currentPage,
  pageSize: props.pageSize,
  totalItems: props.totalItems,
});

// Watch for changes in props and update pagination state
watch(
  () => props.currentPage,
  (newVal) => {
    pagination.value.currentPage = newVal;
  }
);

watch(
  () => props.pageSize,
  (newVal) => {
    pagination.value.pageSize = newVal;
  }
);

watch(
  () => props.totalItems,
  (newVal) => {
    pagination.value.totalItems = newVal;
  }
);

// Methods to handle page, size, and search changes
const handlePageChange = (page) => {
  pagination.value.currentPage = page;
  emit("update:currentPage", page);
};
const handleFilter = (value) => {
  filterQuery.value = value;
  emit("update:filterQuery", value);
};

const handleSizeChange = (size) => {
  pagination.value.pageSize = size;
  emit("update:pageSize", size);
};

const handleSearch = () => {
  pagination.value.currentPage = 1; // Reset to first page when search query changes
  emit("update:searchQuery", searchQuery.value);
};

const navigateToCreate = () => {
  router.push(`/${props.modelName}/create`);
};

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
</script>

<style scoped>
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.card {
  margin-bottom: 20px;
}

.card-header {
  background-color: #f8f9fa;
}

.el-input,
.el-select {
  width: 100%;
}

.el-select {
  width: 120px;
}
</style>
