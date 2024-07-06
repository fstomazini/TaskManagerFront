<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import List from "@/components/List.vue"
import Form from "@/components/Form.vue"
import Login from "@/components/Login.vue"
import Cookie from 'js-cookie'

export default {
  components:{
    NavBar, 
    List,
    Form, 
    Login
  },
  name: 'App',
  mounted: () => {
    
  }
  
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
