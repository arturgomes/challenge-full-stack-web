# Documenting the API and Interface of the Full Stack Web challenge

## API - Node.JS + Express

The sources for the API can be found [here](aca-api). It requires Docker and Node.JS.

```mermaid
  sequenceDiagram
FrontEnd->>Node+Express: student CRUD request 

Node+Express->>PostgreSQL on Docker: TypeORM abstraction
PostgreSQL on Docker-->>Node+Express: JSON response
Node+Express->>FrontEnd: API response to student CRUD 

```

### API Routes for the Application

| Method | Route                 | Description                                              |
|--------|-----------------------|----------------------------------------------------------|
| GET    | `/student`            | List all students                                        |
| GET    | `/student/:ra`        | List one student with a provided `ra` (academic regitry) |
|POST    | `/student/create`     | Create a new student                                     |
|POST    | `/student/update/:ra` |  Edit a student matching a provided `ra`                 |
|DELETE  | `/student/:ra`        | Delete a student matching a provided `ra`                |


### What I did

- I wrote a simple API using Node+Express
- I used Docker in order to create an instance of Postgres
- I used TypeORM for manipulating data from Postgres using the OO paradigm
  - In case of using MongoDB, I'd go for Mongoose
- I didn't go too far on third libraries - my real challenge was to learn Vue
  - (1) The API does not perform fancy input validation (that could be done using Joi or Yup) (see next section.)
  - (2) I didn't use sessions, with authentication and tokens

### What I could've done if I had more time
(1) I would use Yup or Joi for validating the data provided from requests. 
  - It would suppress as much error as possible

(2) I could use JWT for securing the connection, however, it would involve adding a login page, 
and bit more of work for securing the routes. And as it was not in the requirements, I'm just commenting out.

(3) I wish I had more time for providing some unit tests. In order to do so, I could use Jest.

## Interface in Vue.JS

Giving that this was my first experience with Vue.JS, I did enjoy the challenge, although, I must confess I wish I had more time to learn Vue.JS and improve my code.
### What I did
- I used Vuetify as much as I could
- The app use a already available skeleton of the page, with left drawer with a sandwich button.
- I used CSS a few times for a bit of adjustments in the layout, but not too much
- For the modal, I followed an example from the Vue.JS docs.

### What I could've done if I had more time
- I could not understand much of Vuetify manual styling with CSS, and therefore I could not reproduce the design of the form inputs as requested.
  - I'm don't use much of UI libraries in my codes. I'm more used to have a Figma design for a system and develop components tailored for that system.
- I wish I could use some regex in the input fields for validating a CPF and email address. But I wanted to understand what's under the hood intead of going for some stackoverflow answer that would not help me to learn, but just to have the anser right away.
  - I believe I could use some params for key pressing (on key up)  and call a function that checks if the string matches the CPF or even email. At least, that's something I'd do using React or Angular.
- From the above, I also didn't work on providing meaningful warnings for validating fields. The only one used is the `required` props from the `v-text-field` component.
- I could also check (in the frontend) for any field not provided, that could lead to any miss calculation from the API. But again, it would require a bit more of time.