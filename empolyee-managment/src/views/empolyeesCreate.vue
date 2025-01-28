<template>
  <div class="form-container" v-loading="loading">
    <el-form :model="formData" :rules="rules" ref="form" label-width="120px">
      <el-row :gutter="20">
        <!-- User Name Input -->
        <el-col :span="12">
          <el-form-item label="User Name" prop="userName">
            <el-input
              v-model="formData.userName"
              placeholder="Enter user name"
            ></el-input>
          </el-form-item>
        </el-col>

        <!-- Email Input -->
        <el-col :span="12">
          <el-form-item label="Email" prop="email">
            <el-input
              v-model="formData.email"
              placeholder="Enter email"
            ></el-input>
          </el-form-item>
        </el-col>

        <!-- Phone Number Input -->
        <el-col :span="12">
          <el-form-item label="Phone Number" prop="phoneNumber">
            <el-input
              v-model="formData.phoneNumber"
              placeholder="Enter phone number"
            ></el-input>
          </el-form-item>
        </el-col>

        <!-- Education Level Input -->
        <el-col :span="12">
          <el-form-item label="Education Level" prop="educationLevel">
            <el-select
              v-model="formData.educationLevel"
              placeholder="Select education level"
            >
              <el-option label="Grad" value="Grad"></el-option>
              <el-option label="Undergrad" value="Undergrad"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- Image Upload -->
        <el-col :span="12">
          <el-form-item label="Image" prop="ImagePath">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :file-list="photoFileList"
              :on-preview="handlePreview"
              :on-remove="handlePhotoRemove"
              :on-change="handlePhotoChange"
              :auto-upload="false"
              limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>

        <!-- Submit Button -->
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="submitForm">Submit</el-button>
            <el-button @click="resetForm">Reset</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import {
  ElMessage,
  ElForm,
  ElFormItem,
  ElButton,
  ElCol,
  ElRow,
  ElInput,
  ElSelect,
  ElOption,
  ElUpload,
} from "element-plus";
import store from "../store";
import { useRouter } from "vue-router";

const router = useRouter();

// Check user role and redirect if not USER
onMounted(() => {
  const userRole = JSON.parse(localStorage.getItem("userRole"));
  if (userRole !== "USER") {
    ElMessage.error("Only users are allowed to create employees.");
    router.push("/employees");
  }
});

// Form data with initial values
const formData = reactive({
  userName: "",
  email: "",
  phoneNumber: "",
  educationLevel: "",
  ImagePath: null,
  userId: localStorage.getItem("UserId"),
});

// Validation rules
const rules = {
  userName: [
    { required: true, message: "Please enter user name", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Please enter email", trigger: "blur" },
    { type: "email", message: "Please enter a valid email", trigger: "blur" },
  ],
  phoneNumber: [
    { required: true, message: "Please enter phone number", trigger: "blur" },
  ],
  educationLevel: [
    {
      required: true,
      message: "Please select education level",
      trigger: "change",
    },
  ],
  // ImagePath: [
  //   { required: true, message: "Please upload an image", trigger: "change" },
  // ],
};

// Form reference
const form = ref(null);

// Loading state
const loading = ref(false);

// Image upload state
const photoFileList = ref([]);

// Form actions
const submitForm = async () => {
  form.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;
        const employeeData = new FormData();
        employeeData.append("userName", formData.userName);
        employeeData.append("email", formData.email);
        employeeData.append("phoneNumber", formData.phoneNumber);
        employeeData.append("educationLevel", formData.educationLevel);
        employeeData.append("userId", formData.userId.replace(/"/g, ""));
        if (photoFileList.value.length > 0) {
          employeeData.append("ImagePath", photoFileList.value[0].raw);
        }
        await store.dispatch("employees/createEmployee", employeeData);
        router.push("/employees");
      } catch (error) {
        ElMessage.error("Error submitting form.");
        console.error("Error:", error);
      } finally {
        loading.value = false;
      }
    } else {
      ElMessage.error("Please fill out the form correctly.");
      return false;
    }
  });
};

const resetForm = () => {
  form.value.resetFields();
  formData.ImagePath = null;
  photoFileList.value = [];
};

// Image upload handlers
const handlePhotoChange = (file, fileList) => {
  photoFileList.value = fileList.slice(-1);
};

const handlePhotoRemove = (file, fileList) => {
  photoFileList.value = fileList;
};

const handlePreview = (file) => {
  console.log("Preview file:", file);
};
</script>

<style>
.form-container {
  padding: 20px;
  margin-top: 30px;
}
</style>
