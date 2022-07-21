<template>
  <div>
    <div class="top_bar">
      <div class="top_bar__search"  v-if="students.length> 0">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Digite sua busca" single-line hide-details>
        </v-text-field>
      </div>
      <div class="top_bar__store">
        <v-btn @click="newStudent()" large primary>Cadastrar Aluno</v-btn>
      </div>
    </div>
    <div class="container_students">
      <div v-if="students.length> 0">
        <v-data-table :headers="headers" :items="students" :search="search" disable-pagination
        :hide-default-footer="true">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editStudent(item.ra)">mdi-pencil</v-icon>
          <v-dialog v-model="dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" small @click="dialog = true">mdi-delete</v-icon>
            </template>
            <v-card>
              <v-card-title class="body-2">
                Deseja remover esse registro?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn color="gray darken-1" text @click="deleteStudent(item.ra); dialog = false">
                  Confirmar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </template>
      </v-data-table>
      </div>
      <div v-else><p>Nenhum registro acadêmico cadastrado</p></div>
    
    </div>

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
      dialog: false,
      headers: [
        { text: "Registro Acadêmico", align: "start", sortable: true, value: "ra" },
        { text: "Nome", value: "name", sortable: true },
        { text: "CPF", value: "cpf", sortable: true },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveStudents() {
      StudentDataService.getAll()
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudent);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
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
    editStudent(ra) {
      this.$router.push({ name: "student-details", params: { ra: ra } });
    },
    newStudent() {
      this.$router.push({ name: "student-details", params: { ra: null } });
    },
    deleteStudent(ra) {
      StudentDataService.delete(ra)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayStudent(student) {
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