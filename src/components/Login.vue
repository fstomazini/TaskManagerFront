
<template>
  <div class="container">
    <p>

    </p>
    <b-card>
        <p></p>
        <form @submit.prevent="login">
        <h2 class="mb-3">Login</h2>
        <div class="input">
            <label for="email">Usuario</label>
            <b-input
            class="form-control"
            type="text"
            name="email"
            placeholder="email@adress.com"
            v-model="username"
            ></b-input>
        </div>
        <div class="input">
            <label for="password">Senha</label>
            <b-input
            class="form-control"
            type="password"
            name="password"
            placeholder="password123"
            v-model="password"
            ></b-input>
        </div>
        
        <b-button type="submit" class="mt-4 btn-pers" id="login_button" v-on:click="login()">
            Login
        </b-button>
        <div
            class="alert alert-warning alert-dismissible fade show mt-5 d-none"
            role="alert"
            id="alert_1"
        >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            ></button>
        </div>
        </form>
    </b-card>
    
  </div>
</template>

<script>
import Request from "@/service/request.js"
import Cookie from 'js-cookie';
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      
      let options = {
        request: {
          url: "http://localhost:3000/auth/authenticate",
          payload:  { username: this.username , password: this.password }
        }
      };
      Request().postRequest(options).then(response => {
            let jwtKey = response.jwtKey;
            let role = response.role
            let user_id = response.id

            let userObject = {
                jwtKey: "Bearer " + jwtKey,
                user_id: user_id ,
                user_role: role
            }
            Cookie.set('jwt-token', userObject.jwtKey);
            Cookie.set('userId', userObject.user_id);
            Cookie.set('userRole', userObject.user_role);
            localStorage.userObject = userObject;
            this.$router.push("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          
          console.log("Deu Ruim menor");
        });
    },
    moveToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>