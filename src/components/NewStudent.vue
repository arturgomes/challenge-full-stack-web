<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Cadastro de Aluno</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="student.name"
          :rules="[(v) => !!v || 'Name is required']"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="student.email"
          :rules="[(v) => !!v || 'Email is required']"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="student.cpf"
          :rules="[(v) => !!v || 'CPF is required']"
          label="CPF"
          required
        ></v-text-field>
      </v-form>
      <v-btn color="primary" @click="goBack">Cancelar</v-btn>
          <v-btn color="success" @click="saveStudent">Salvar</v-btn>
   </div>
    <div v-else>
      <v-card class="mx-auto">
        <v-card-name>
          Enviado com sucesso!
        </v-card-name>
        <v-card-subtitle>
          Clique no botão para cadastrar novo aluno.
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="success" @click="newStudent">Novo Aluno</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import StudentDataService from "../services/StudentDataService";
export default {
  name: "add-student",
  data() {
    return {
      student: {
        ra: null,
        name: "",
        email: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveStudent() {
      var data = {student:{
        name: this.student.name,
        email: this.student.email,
        cpf: this.student.cpf,
      }};
      StudentDataService.create(data)
        .then((response) => {
          this.student.ra = response.data.ra;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newStudent() {
      this.submitted = false;
      this.student = {};
    },
    goBack(){
      this.$router.push({ name: "list" });
    }
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
}
</style>