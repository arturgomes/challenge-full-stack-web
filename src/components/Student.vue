<template>
  <div v-if="$route.params.ra" class="edit-form py-3">
    <p class="headline">Editar Aluno</p>
    <v-form ref="form" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <v-subheader>Nome</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field v-model="currentStudent.name" :rules="[(v) => !!v || 'Nome é obrigatório']"
              label="Informe o Nome Completo" required outlined>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-subheader>Email</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field v-model="currentStudent.email" :rules="[(v) => !!v || 'Email é obrigatório']"
              label="Informe apenas um email" required outlined>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-subheader>RA</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field v-model="currentStudent.ra" :rules="[(v) => !!v || 'RA é obrigatório']"
              label="Informe o registro acadêmico" disabled outlined>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-subheader>CPF</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field v-model="currentStudent.cpf" :rules="[(v) => !!v || 'CPF é obrigatório']"
              label="Informe o número do documento" disabled outlined>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="button_actions">

        <v-btn color="error" small class="mr-2" @click="goBack">
          Cancelar
        </v-btn>
        <v-btn color="success" small @click="updateStudent">
          Atualizar
        </v-btn>
      </v-container>
    </v-form>
    <p class="mt-3">{{ message }}</p>
  </div>
  <div v-else class="edit-form py-3">
    <p class="headline">Cadastrar Aluno</p>
    <div v-if="!submitted">

      <v-form ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col cols="2">
              <v-subheader>Nome</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="currentStudent.name" :rules="[(v) => !!v || 'Nome é obrigatório']"
                label="Informe o Nome Completo" required outlined>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-subheader>Email</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="currentStudent.email" :rules="[(v) => !!v || 'Email é obrigatório']"
                label="Informe apenas um email" required outlined>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-subheader>RA</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="currentStudent.ra" :rules="[(v) => !!v || 'RA é obrigatório']"
                label="Informe o registro acadêmico" outlined>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-subheader>CPF</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="currentStudent.cpf" :rules="[(v) => !!v || 'CPF é obrigatório']"
                label="Informe o número do documento" outlined>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>

      </v-form>
      <v-container class="button_actions">

        <v-btn color="error" small class="mr-2" @click="goBack">
          Cancelar
        </v-btn>
        <v-btn color="success" small @click="saveStudent">
          Cadastrar
        </v-btn>
      </v-container>
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
           <v-btn color="error" small class="mr-2" @click="goBack">
          Cancelar
        </v-btn>
          <v-btn color="success" @click="newStudent">Novo Aluno</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <p class="mt-3">{{ message }}</p>
  </div>
</template>

<script>
import StudentDataService from "../services/StudentDataService";
export default {
  name: "student",
  data() {
    return {
      editStudent: false,
      currentStudent: {
        ra: "",
        name: "",
        email: "",
        cpf: "",
      },
      submitted: false,
      message: "",
    };
  },
  methods: {
    getStudent(ra) {

      ra && StudentDataService.get(ra)
        .then((response) => {
          this.currentStudent = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

    },
    updateStudent() {
      const data = { name: this.currentStudent.name, email: this.currentStudent.email }
      StudentDataService.update(this.currentStudent.ra, data)
        .then((response) => {
          this.message = "The student was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveStudent() {
      var data = {
        student: {
          ra: this.currentStudent.ra,
          name: this.currentStudent.name,
          email: this.currentStudent.email,
          cpf: this.currentStudent.cpf,
        }
      };
      StudentDataService.create(data)
        .then((response) => {
          this.student.ra = response.data.ra;
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
    goBack() {
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
  padding: 20px;
  margin: auto;
}

.button_actions {
  display: flex;
  justify-content: right;
  gap: 10px;
}
</style>