<template>
  <div>
    <div class="top_bar">
      <div class="top_bar__search">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Digite sua busca" single-line hide-details>
        </v-text-field>
      </div>
      <div class="top_bar__store">
        <v-btn @click="goToNewStudent()" large primary>Cadastrar Aluno</v-btn>
      </div>
    </div>
    <div class="container_students">
      <v-data-table :headers="headers" :items="students" :search="search" disable-pagination
        :hrae-default-footer="true">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editStudent(item.ra)">mdi-pencil</v-icon>
          <v-icon small @click="deleteStudent(item.ra)">mdi-delete</v-icon>
        </template>
      </v-data-table>
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
          console.log(this.students);
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
          console.log(response.data);
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
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editStudent(ra) {
      this.$router.push({ name: "student-details", params: { ra: ra } });
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
    },
    goToNewStudent(){
      this.$router.push({ name: "add" });
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