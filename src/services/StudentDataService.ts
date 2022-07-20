import http from "@/http-common";
class StudentDataService {
  getAll() {
    return http.get("/student");
  }
  get(id:string) {
    return http.get(`/student/${id}`);
  }
  create(data:{name:string,email:string}) {
    return http.post("/student/create", data);
  }
  update(id:string, data:{name:string,email:string}) {
    return http.post(`/student/update/${id}`, data);
  }
  delete(id:string) {
    return http.delete(`/student/${id}`);
  }
  deleteAll() {
    return http.delete(`/student`);
  }
  findByName(name:string) {
    return http.get(`/student?name=${name}`);
  }
}
export default new StudentDataService();