<template>
  <!-- the component switches from creating to editing depending  -->
  <!-- on the `ra` route params -->
  <!-- if it is not null, then a student entry can be edited -->
  <div v-if="$route.params.ra" class="edit-form py-3">
    <p class="headline">Editar Aluno</p>
    <v-form ref="form" lazy-validation>
      <div class="form_container">
        <div class="form_container__row">
          <v-subheader class="form_container__row__desc" >Nome</v-subheader>
          <v-text-field 
            v-model="currentStudent.name" 
            :rules="[(v) => !!v || 'Nome é obrigatório']"
            placeholder="Informe o Nome Completo" required class="form_container__row__field caption">
          </v-text-field>
        </div>
        <div class="form_container__row">
          <v-subheader class="form_container__row__desc" >Email</v-subheader>
          <v-text-field 
            v-model="currentStudent.email" 
            :rules="[(v) => !!v || 'Email é obrigatório']"
            placeholder="Informe apenas um email"  
            required class="form_container__row__field caption">
          </v-text-field>
        </div>
        <div class="form_container__row">
          <v-subheader class="form_container__row__desc" >RA</v-subheader>
          <v-text-field v-model="currentStudent.ra" disabled class="form_container__row__field caption"> </v-text-field>
        </div>
        <div class="form_container__row">
          <v-subheader class="form_container__row__desc" >CPF</v-subheader>
          <v-text-field v-model="currentStudent.cpf" disabled class="form_container__row__field caption">
          </v-text-field>
        </div>
      </div>
      <v-container class="button_actions">
        <v-btn color="grey lighten-5" small class="mr-2" @click="goBack">
          Cancelar
        </v-btn>
        <v-btn color="grey" small @click="updateStudent">
          Salvar
        </v-btn>
      </v-container>
    </v-form>
    <p class="mt-3">{{ message }}</p>
  </div>
  <!-- if 'ra' is null, then a new student can be added  -->
  <div v-else class="edit-form py-3">
    <p class="headline">Cadastrar Aluno</p>
    <div >
      <v-form ref="form" lazy-validation>
        <div class="form_container">
          <div class="form_container__row">
            <v-subheader class="form_container__row__desc" >Nome</v-subheader>
            <v-text-field class="form_container__row__field caption"
            v-model="currentStudent.name"
              :rules="[(v) => !!v || 'Nome é obrigatório']" 
              label="Informe o Nome Completo" required>
            </v-text-field>
          </div>
          <div class="form_container__row">
            <v-subheader class="form_container__row__desc" >Email</v-subheader>
            <v-text-field v-model="currentStudent.email" :rules="[(v) => !!v || 'Email é obrigatório']"
              label="Informe apenas um email" required class="form_container__row__field  caption">
            </v-text-field>
          </div>
          <div class="form_container__row">
            <v-subheader class="form_container__row__desc" >RA</v-subheader>
            <v-text-field v-model="currentStudent.ra" :rules="[(v) => !!v || 'RA é obrigatório']"
              label="Informe o registro acadêmico" class="form_container__row__field caption">
            </v-text-field>
          </div>
          <div class="form_container__row">
            <v-subheader class="form_container__row__desc" >CPF</v-subheader>
            <v-text-field v-model="currentStudent.cpf" :rules="[(v) => !!v || 'CPF é obrigatório']"
              label="Informe o número do documento" class="form_container__row__field caption">
            </v-text-field>
          </div>
        </div>

      </v-form>
      <v-container class="button_actions">

        <v-btn color="grey lighten-5" small class="mr-2" @click="goBack">
          Cancelar
        </v-btn>
        <v-btn color="grey" small @click="saveStudent">
          Salvar
        </v-btn>
      </v-container>
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
          this.message = "Aluno atualizado com sucesso!";
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
          if(response.data.message === "student created successfully")
          this.submitted = true;
          this.message="Aluno criado com sucesso"
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
<style lang="scss">
.edit-form {
  padding: 20px;
  margin: auto;
}

.button_actions {
  display: flex;
  justify-content: right;
  padding:0;
}

.form_container {
  &__row {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    display: flex;
    padding-right:20px;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
    line-height: 40px;
    &__desc {
      width: 20%;
      margin-right:20px;
    }
    &__field {
      width: 300px;
      display: inline-block;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }
}
.success_card{
  padding:20px;
}
</style>