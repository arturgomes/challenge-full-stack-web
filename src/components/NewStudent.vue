<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Cadastro de Aluno</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-container fluid>
          <v-row class="field" justify>
            <v-col cols="2" >
              <v-subheader>Nome</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="student.name" :rules="[(v) => !!v || 'Nome é obrigatório']"
                label="Informe o Nome Completo" required outlined>
              </v-text-field>
            </v-col>
          </v-row>
           <v-row>
            <v-col cols="2">
              <v-subheader>Email</v-subheader>
            </v-col>
            <v-col cols="8">
               <v-text-field v-model="student.email" :rules="[(v) => !!v || 'Email é obrigatório']" label="Informe apenas um email" required outlined>
        </v-text-field>
            </v-col>
          </v-row>
           <v-row>
            <v-col cols="2">
              <v-subheader>RA</v-subheader>
            </v-col>
            <v-col cols="8">
             <v-text-field v-model="student.ra" :rules="[(v) => !!v || 'RA é obrigatório']" label="Informe o registro acadêmico" required outlined>
        </v-text-field>
            </v-col>
          </v-row>
           <v-row>
            <v-col cols="2">
              <v-subheader>CPF</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="student.cpf" :rules="[(v) => !!v || 'CPF é obrigatório']" label="Informe o número do documento" required outlined>
        </v-text-field>
            </v-col>
          </v-row>
        </v-container>
        
      </v-form>
        <v-container class="button_actions">

          <v-btn color="primary" @click="goBack">Cancelar</v-btn>
          <v-btn color="success" @click="saveStudent">Salvar</v-btn>
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
        ra: "",
        name: "",
        email: "",
        cpf: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveStudent() {
      var data = {
        student: {
          ra: this.student.ra,
          name: this.student.name,
          email: this.student.email,
          cpf: this.student.cpf,
        }
      };
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
    goBack() {
      this.$router.push({ name: "list" });
    }
  },
};
</script>
<style lang="scss">
.submit-form {
  max-width: 600px;
}
.button_actions{
  display:flex;
  justify-content: right;
  gap:10px;
}
</style>