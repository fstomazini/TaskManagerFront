<template>
    <div >

        <b-modal :id="FormEdit" title="Editar tarefa">
            <Form
                mod="edit"
                :taskId="id"
            />
        </b-modal>
        <b-card
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
        <b-card-header>
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        {{title}}
                    </div>
                    <div class="col-4">
                       <div>
                        <PriorityBadge
                            :priority="priority"
                        />
                       </div>
                        <div>
                        <b-badge  variant="secondary">{{situation}}</b-badge>
                       </div>

                    </div>
                </div>
            </div>
        </b-card-header>
        
            <b-card-text>
               <div>
                <p>{{category}}</p>
               </div>
               <div>
                <p>{{description}}</p>
               </div>
               <h6>Observações:</h6>
               <div v-for="annotation in annotationsToShow" :key="annotation.id" class="row">
                <div class="col-8">
                    <h6>{{annotation.annotation}}</h6>
                    <b-collapse :id="'edit-coment'+annotation.id">
                        <b-form-input v-model="editedText" ></b-form-input>
                        <b-icon icon="x-circle" b-tooltip.hover title="cancelar" v-b-toggle="'edit-coment'+ annotation.id"></b-icon>
                        <b-icon icon="check-circle" b-tooltip.hover title="Enviar" v-on:click="editAnnotationById(annotation)"  v-b-toggle="'edit-coment'+ annotation.id"></b-icon>
                    </b-collapse>
                    
                </div>
                <div class="col-1">
                    <b-icon icon="journal" b-tooltip.hover title="Editar" v-b-toggle="'edit-coment'+ annotation.id"></b-icon>
                </div>
                <div class="col-1">
                    <b-icon icon="x-circle" b-tooltip.hover title="Excluir" v-on:click="deleteAnnotationById(annotation)"></b-icon>
                </div>
               </div>
                <div>
                    <b-icon icon="plus-square" b-tooltip.hover title="Novo comentário" v-b-toggle="'new-comment'+id"></b-icon>
                    <b-collapse :id="'new-comment'+id">
                        <b-form-input v-model="editedText" ></b-form-input>
                        <b-icon icon="x-circle" b-tooltip.hover title="cancelar" v-b-toggle="'new-comment'+id"></b-icon>
                        <b-icon icon="check-circle" b-tooltip.hover title="Enviar" v-on:click="newAnnotation()"  v-b-toggle="'new-comment'+id"></b-icon>
                    </b-collapse>
                </div>
                <div class="row">
                  <div class="col-sm">
                    <b-button  variant="success" v-on:click="setTaskToActive" >iniciar</b-button> 
                  </div>
                  <div class="col-sm">
                    <b-button variant="danger" v-on:click="setTaskToDone">finalizar</b-button>
                  </div>
                  <div class="col-sm">
                    <b-button  variant="primary" v-b-modal="FormEdit" :disabled="!userHaveAccess">editar</b-button>
                  </div>
                </div>
            </b-card-text>
        </b-card>
    </div>
</template>
<script>
import PriorityBadge from '@/components/PriorityBadge.vue'
import Form from '@/components/Form.vue'
import Request from '@/service/request.js'
import Cookie from 'js-cookie';

export default {
    name: "base-list",
    components:{
        PriorityBadge,
        Form
    },
    props:{
        id:{
            type: Number,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
            },
        description:{
            type: String,
            require: true
        },
        priority:{
            type: String,
            required: true
        },
        situation:{
            type: String,
            required: true 
        },
        limitDate:{
            type: Number,
            required: false,
            default: null
        },
        annotations:{
            type: Array,
            required: true
        }, 
        owner:{
            type: Number,
            required: true
        }
    },
    mounted: function(){
        this.userObejct = Cookie.get('jwt-token')
        this.getAnnotationsById();

    },
    data(){
        return{
            annotationsToShow:[],
            editedText: '',
        }      
    },
    computed:{
        FormEdit(){
            return "form-edit-"+ this.id.toString()
        },
        userHaveAccess(){
            if(this.owner == Cookie.get('userId') || Cookie.get('userRole') == "ROLE_ADMIN"){
                return true;
            } return false;
        }
    },
    methods:{
        newAnnotation(){
            let body={
                taskId: this.id,
                annotation: this.editedText
            }
            let options = {
                request: {
                    url: "http://localhost:3000/newannotation",
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
            this.getAnnotationsById(),
            this.editedText=''
        },
        editTaskById(status){
            let body = {
                    id: this.id,
                    title: this.title,
                    category: this.category,
                    description: this.description,
                    priority: this.priority,
                    situation: status,
                    limitDate: this.limitDate,
                    annotations: this.annotations || [],
                    owner: this.owner,
            }
            let options = {
                request: {
                    url: "http://localhost:3000/edittaskbyid",
                    payload:  body,
                    extraOptions: {
                        withCredentials: false,
                        headers: {
                            'Authorization': Cookie.get('jwt-token')
                        }
                    }
                },
                
            };
            Request().postRequest(options)

            },
        editAnnotationById(annotation){
            let body = {
                    id: annotation.id,
                    taskId: annotation.taskId,
                    annotation: this.editedText
            }
            let options = {
                request: {
                    url: "http://localhost:3000/editannotationbyid",
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
            this.annotationsToShow = [];
            this.getAnnotationsById();
            },
            deleteAnnotationById(annotation){
            let body = {
                    id: annotation.id,
                    taskId: annotation.taskId,
                    annotation: annotation.annotation
            }
            let options = {
                request: {
                    url: "http://localhost:3000/deleteannotationbyid",
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
            this.annotationsToShow = [];
            this.getAnnotationsById();
            },
        setTaskToDone: function (){
            this.editTaskById('CONCLUIDA');
            this.$emit('getAllTasks')
        },
         setTaskToActive: function(){
            this.editTaskById('INICIADA');
            this.$emit('getAllTasks')
        },
        getAnnotationsById(){
            let body = {
                    id: this.id,
                
            }
            let options = {
                request: {
                    url: "http://localhost:3000/findannotationsbytaskid",
                    payload:  body,
                    extraOptions: {
                        withCredentials: true,
                        headers: {
                            'Authorization': Cookie.get('jwt-token')
                        }
                    }
                },               
            };
            Request().postRequest(options).then(response =>{
                response.forEach(element => {
                    this.annotationsToShow.push(element)
                    
                });
            })
        },
        attSelection(){
            
            this.$emit('getAllTasks')
        }

    },
    watch:{
        
    }

}
</script>
