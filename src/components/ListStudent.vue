<template>
  <div>
    <!-- top bar for search and storing new student -->
    <div class="top_bar">
      <div class="top_bar__search" v-if="students.length > 0">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Digite sua busca" single-line hide-details>
        </v-text-field>
      </div>
      <div class="top_bar__store">
        <v-btn @click="newStudent()" large primary>Cadastrar Aluno</v-btn>
      </div>
    </div>
    <!-- end of top bar -->

    <!-- container with table of stored students  -->
    <!-- it wont display the table unless at least one student is registred -->
    <div class="container_students">
      <div v-if="students.length > 0">
        <v-data-table :headers="headers" :items="students" :search="search" disable-pagination
          :hide-default-footer="true">

          <!-- including modal for confirming student removal -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editStudent(item.ra)">mdi-pencil</v-icon>
            
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on }">
               <v-icon v-on="on" small @click="openModal(item.ra)">mdi-delete</v-icon>
              </template>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  Deseja remover esse registro?
                </v-card-title>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="gray darken-1" text @click="dialog = false">
                    Cancelar
                  </v-btn>
                  <v-btn color="gray darken-1" text @click="deleteStudent(currentRA); dialog = false">
                    Confirmar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </template>
        </v-data-table>
      </div>
      <!-- won't display if no student is found -->
      <div v-else>
        <p>Nenhum registro acadêmico cadastrado</p>
      </div>

    </div>
    <!-- end of container -->

  </div>
</template>

<script>
import StudentDataService from "../services/StudentDataService";
export default {
  name: "students-list",
  data() {
    return {
      search: '',
      students: [],
      name: "",
      dialog: false, // used for modal
      currentRA: "",
      headers: [ // fields for the table - Vuetify component
        { text: "Registro Acadêmico", align: "start", sortable: true, value: "ra" },
        { text: "Nome", value: "name", sortable: true },
        { text: "CPF", value: "cpf", sortable: true },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    //methods for accessing the api through the service StudentDataService
    retrieveStudents() {
      StudentDataService.getAll()
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudent);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() { // used whenever an action is performed
      this.retrieveStudents();
    },
    removeAllStudents() {
      StudentDataService.deleteAll()
        .then((response) => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchTitle() {
      StudentDataService.findByTitle(this.name)
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudent);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * the same component 'student-details' is used for both creating and editing
     * a student record
     */
    editStudent(ra) {
      this.$router.push({ name: "student-details", params: { ra: ra } });
    },
    newStudent() {
      this.$router.push({ name: "student-details", params: { ra: null } });
    },
    deleteStudent(ra) {
      console.log(ra)
      StudentDataService.delete(ra)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openModal(ra) {
      this.dialog = true;
      this.currentRA = ra;

    },
    getDisplayStudent(student) {
      /**
       * filter the student data to be displayed 
       */
      return {
        ra: student.ra,
        name: student.name,
        cpf: student.cpf,
      };
    }
  },
  mounted() {
    this.retrieveStudents();
  },
};
</script>
<!-- Not much of css in here, just some basic adjustments -->
<style lang="scss">
.top_bar {
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  &__search {
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
  }
}

.container_students {
  padding: 20px;
}
</style>