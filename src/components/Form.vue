<template>
  <div class="container">
    <b-card>
      <b-card-header>
        <b-form>
          <p>Título</p>
          <b-form-input
            v-model="newTitle"
            placeholder="insira um titulo para tarefa"
          ></b-form-input>
          <div class="row">
            <div class="col-8">
              <b-form-select v-model="newCategory" :options="listCategorys">
              </b-form-select>
            </div>
            <div class="col-4">
              <b-button variant="success" v-b-toggle.collapse-new-category>
                Nova Categoria
              </b-button>
            </div>
            <b-collapse id="collapse-new-category">
              <div class="flex">
               
                <b-card bg-variant="light">
                  <b-form-group
                    label-cols-md="3"
                    label="Nova Categoria"
                    label-size="md"
                    label-class="font-weight-bold pt-0"
                    class="mb-0"
                  >
                    <b-form-group
                      label="Nome Categoria"
                      label-for="newNameCategory"
                      label-cols-sm="4"
                      label-align-sm="left"
                    >
                      <b-form-input id="newNameCategory" v-model="newEntry.newNameCategory"></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label="Descricao"
                      label-for="newDescriptionName"
                      label-cols-sm="4"
                      label-align-sm="left"
                    >
                      <b-form-input id="newDescriptionName" v-model="newEntry.newDescriptionCategory"></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label="Prioridade"
                      label-for="newPriorityCategory"
                      label-cols-sm="4"
                      label-align-sm="left"
                    >
                      <b-form-select id="newPriorityCategory" v-model="newEntry.newPriorityCategory" :options="listPrioritys"></b-form-select>
                    </b-form-group>

                    
                    <b-button variant="success" v-on:click="(postNewCategory(newEntry), getAllCattegorys())" v-b-toggle.collapse-new-category>Confirmar</b-button>
                    <b-button variant="danger" v-b-toggle.collapse-new-category>Cancelar</b-button>
                    
                  </b-form-group>
                </b-card>
              </div>
            </b-collapse>
          </div>

          <b-form-input
            v-model="newDescription"
            placeholder="insira uma descrição"
          ></b-form-input>
          <b-form-select
            v-model="newPriority"
            :options="listPrioritys"
          ></b-form-select>
          <div>
            <b-calendar
              v-model="newLimitDate"
              :min="min"
              locale="en"
            ></b-calendar>
          </div>
          <b-button type="Cadastrar" variant="success" v-on:click="postAction()">Registrar</b-button>
          <b-button type="Cancelar" variant="danger">Cancelar</b-button>
        </b-form>
      </b-card-header>
    </b-card>
  </div>
</template>
<script>
import Request from '@/service/request'
import Cookie from 'js-cookie'

export default {
  name: "new-task-form-edit",
  props:{
    mod:{
      type: String,
      required: false,
      default : 'new'
      
    },
    taskId:{
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return {
      min: today,
      newId:'',
      newTitle: "",
      newCategory: "",
      newDescription: "",
      newPriority: "",
      newSituation: "",
      newLimitDate: 0,
      sendCategory:'',
      newAnnotations: [],
      newOwner: 0,
      listCategorys: [],
      listPrioritys: [
        { value: "MUITO_BAIXA", text: "MUITO BAIXA" },
        { value: "BAIXA", text: "BAIXA" },
        { value: "MEDIA", text: "MEDIA" },
        { value: "ALTA", text: "ALTA" },
        { value: "MUITO_ALTA", text: "MUITO ALTA" },
      ],
      newEntry: {
        newNameCategory: '',
        newDescriptionCategory: '',
        newPriorityCategory: ''
      }, 
      userObject: {}
    };
  },
  mounted: function () {
    this.getAllCattegorys()
    if(this.mod == 'edit'){
      this.getTaskById(this.taskId);
    }
    
  },
  methods: {

    getAllCattegorys: async function () {
      this.listCategorys = [];
      let options = {
        request: {
          url: "http://localhost:3000/getcategorys",
          extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
        },
        
      };
      Request().getRequest(options)
      .then((response) => {
      response.forEach((element) => {
        let aux = {
          id: element.id,
          value: element.id,
          name: element.name,
          text: element.name,
          discription: element.discription,
          priority: element.priority,
        };
        console.log(aux)
        this.listCategorys.push(aux);
      });
    });
    },
    postNewCategory : async (newEntry) =>{
         let body={
            name: newEntry.newNameCategory,
            discription: newEntry.newDescriptionCategory,
            priority: newEntry.newPriorityuCategory
         }
         let options = {
            request: {
            url: "http://localhost:3000/newcategory",
            payload:body,
            extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
            },  
         } 
         Request().postRequest(options);
 
    }, 
    postNewTask(){
        let body = {
                title: this.newTitle,
                category: this.sendCategory,
                description: this.newDescription,
                priority: this.newPriority,
                situation: this.newSituation,
                limitDate: this.newLimitDate,
                annotations: this.newAnnotations,
                owner: Cookie.get('userId'),
        }
        let options = {
        request: {
          url: "http://localhost:3000/newtask",
          payload: body,
          extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
        },  
      };
        Request().postRequest(options);

    },
    editTaskById(){
            let body = {
                    id: this.newId,
                    title: this.newTitle,
                    category: this.sendCategory,
                    description: this.newDescription,
                    priority: this.newPriority,
                    situation: this.newSituation,
                    limitDate: this.newLimitDate,
                    annotations: this.newAnnotations,
                    owner: this.newOwner || 0,
            }
            let options = {
                request: {
                    url: "http://localhost:3000/edittaskbyid",
                    payload:  body,
                    extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
                },
                
            };
        
            Request().postRequest(options)
            }, 
    postAction(){
      if(this.mod == 'new'){
        this.postNewTask();
      }else this.editTaskById();
    },
    getTaskById(id){
      let body = {
        id: id
      }
      let options = {
        request: {
          url: "http://localhost:3000/findtaskbyid",
          payload: body,
          extraOptions: {
              withCredentials: true,
              headers: {
                'Authorization': Cookie.get('jwt-token')
              }
            }
        },
        
    }
    Request().postRequest(options).then(response =>{
      this.newId = response.id
      this.newTitle= response.title
      this.newCategory= response.category
      this.newDescription= response.description
      this.newPriority=response.priority
      this.newSituation= response.situation
      this.newLimitDate= response.limitDate
      this.newAnnotations= response.annotations
      this.newOwner= response.owner 
      }
      
    );
    }
  },
  watch: {
    newCategory(newValue, oldValue) {
      this.listCategorys.forEach((element) => {
        if (element.id == newValue) {
          this.sendCategory = element.name 
          this.newPriority = element.priority;
        }
      });
    },
  },
};
</script>
