<template>
  <div v-if="currentStudent" class="edit-form py-3">
    <p class="headline">Edit Student</p>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentStudent.name"
        :rules="[(v) => !!v || 'Name is required']"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="currentStudent.email"
        :rules="[(v) => !!v || 'Email is required']"
        label="email"
        required
      ></v-text-field>
      <v-divider class="my-5"></v-divider>
      
      <v-btn color="error" small class="mr-2" @click="deleteStudent">
        Delete
      </v-btn>
      <v-btn color="success" small @click="updateStudent">
        Update
      </v-btn>
    </v-form>
    <p class="mt-3">{{ message }}</p>
  </div>
  <div v-else>
    <p>Please click on a Student...</p>
  </div>
</template>
<script>
import StudentDataService from "../services/StudentDataService";
export default {
  name: "tutorial",
  data() {
    return {
      currentStudent: null,
      message: "",
    };
  },
  methods: {
    getStudent(ra) {
      StudentDataService.get(ra)
        .then((response) => {
          this.currentStudent = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateStudent() {
      console.log(this.currentStudent)
      const data = {name:this.currentStudent.name, email:this.currentStudent.email}
      StudentDataService.update(this.currentStudent.ra, data)
        .then((response) => {
          console.log(response.data);
          this.message = "The student was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteStudent() {
      StudentDataService.delete(this.currentStudent.ra)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "students" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    goBack(){
      this.$router.push({ name: "list" });
    }
  },
  mounted() {
    this.message = "";
    this.getStudent(this.$route.params.ra);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>