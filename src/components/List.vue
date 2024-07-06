<template>
  <div>
    <NavBar
        @getAllTasks="getAllTasks"
        @filterByPendente="filterByPendente"
        @filterByAtiva="filterByAtiva"
        @filterByConcluida="filterByConcluida"
        @filterBySelectedParam="filterBySelectedParam"
    />
    <p> </p>
    <b-container justify-content-center>
      <div>
        <b-list>
          <b-list-item>
            <b-card-group deck  v-if="haveDataToShow">
                  <BaseList
                    v-for="item in data" 
                    :key="item.id" 
                    :id="item.id"
                    :title="item.title"
                    :category="item.category"
                    :description="item.description"
                    :priority="item.priority"
                    :situation="item.situation"
                    :annotations="item.annotations"
                    :owner="item.owner"
                    @getAllTasks="getAllTasks"
                  />
            </b-card-group>
            <div v-else>
                  Nenhum resultado para este filtro :(
                </div>
          </b-list-item>
        </b-list>
      </div>
    </b-container>
  </div>
</template>

<script>
import BaseList from "@/components/BaseList.vue";
import NavBar from "@/components/NavBar";
import axios from 'axios';
import Request from "@/service/request.js"
import Cookie from 'js-cookie';


export default {
  name: "list",
  components: {
    BaseList,
    NavBar
  },
  data() {
    return {
      data: [],
    };
  },
  mounted: function(){
    if(!localStorage.userObject){
      this.$router.push("/login");
    }
    this.getAllTasks();
    
  },
  methods: {
    getAllTasks(){
      
      let options = {
        request: {
          url: "http://localhost:3000/findalltasks",
          extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
        },       
      };
          Request().getRequest(options).then(response => {
          this.data = response})
    },
    getTasksBySituation(situation){
        let param = situation.toUpperCase()
        let options = {
        request: {
          url: "http://localhost:3000/findtasksbysituation",
          payload:  { situation: param },
          extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
        },
      };
      Request().postRequest(options).then(response => {
            this.data=[];
            this.data = response;
        })
    },
    getTaskByPriority(priority){
        let param = priority.toUpperCase();
        param = param.replace(' ', '_');
        let options = {
        request: {
          url: "http://localhost:3000/findtaskbypriority",
          payload:  { priority: param },
          extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
        },
      };
      Request().postRequest(options).then(response => {
            this.data=[];
            this.data = response;
        })
    },
    getTasksByOwner(owner){
        let options = {
        request: {
          url: "http://localhost:3000/findtasksbyowner",
          payload:  { owner: owner },
          extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
        }, 
      };
      this.data=[];
      Request().postRequest(options).then(response => {
            this.data=[];
            this.data = response;
        })
    },
    getTasksByCategory(category){
        let options = {
        request: {
          url: "http://localhost:3000/findtaskbycategory",
          payload:  { category: category },
          extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
        },
        
      };
      this.data=[];
      Request().postRequest(options).then(response => {
            this.data=[];
            this.data = response;
        })
    },
    filterByPendente(){
        this.getTasksBySituation('PENDENTE');
    },
    filterByAtiva(){
        
        this.getTasksBySituation('INICIADA');
    },
    filterByConcluida(){
        this.getTasksBySituation('CONCLUIDA');
    }, 
    filterBySelectedParam(param, value){
      switch(param){
        case 'priority':
          this.getTaskByPriority(value);
          break;
        case 'situation' :
          this.getTasksBySituation(value)
          break;
        case 'owner':
          this.getTasksByOwner(value);
          break;
        case 'category':
          this.getTasksByCategory(value);
          break; 
      }
    }
  },
  computed:{
    haveDataToShow(){
      if(this.data.length <= 0){
        return false
      }return true
    },
    
  }
};
</script>