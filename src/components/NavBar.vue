<template>
  <div>
  <b-modal id=modal-cadastro title="Cadastrar nova tarefa" class="lg">
    <Form
      mod="new"
    />
  </b-modal>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Task Manager</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item  v-on:click="$emit('getAllTasks')">Todas</b-nav-item>
        <b-nav-item  v-on:click="$emit('filterByPendente')">Pendentes</b-nav-item>
        <b-nav-item  v-on:click="$emit('filterByAtiva')">Ativas</b-nav-item>
        <b-nav-item  v-on:click="$emit('filterByConcluida')">Concluidas</b-nav-item>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button variant="success" class="mr-sm-2" v-b-modal.modal-cadastro>Nova tarefa</b-button>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar" v-model="searchParam" ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" v-on:click="$emit('filterBySelectedParam',searchOpSelected, searchParam )" v-model="searchParam">Buscar</b-button>
          <b-form-select v-model="searchOpSelected" :options="searchOptions" size="sm" class="my-2 my-sm-2"></b-form-select>
        </b-nav-form>

        

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item v-on:click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
import Form from '@/components/Form.vue'
export default {
    name: "navbar",
    components:{
      Form
  },
  data(){
    return{
      searchOpSelected : '',
      searchOptions: [{value: 'priority',  text: 'Priority'}, {value: 'situation',  text: 'Situation'}, {value: 'owner',  text: 'Owner'},{value: 'category',  text: 'Category'} ],
      searchParam: ''
    }
  },
  methods:{
    searchBySelectedParam(){
      this.$emit('filterBySelectedParam', this.searchOpSelected, this.searchParam );
    },
    logout(){
      localStorage.clear();
      this.$router.push("/login");
    
    }
  

  }

    
}
</script>
