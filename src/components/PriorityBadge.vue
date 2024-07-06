<template>
    <div>
        <div v-if="isLevelOnePrioeity">
            <b-badge b-tooltip.hover :title="message" variant="secondary">{{priorityText}}</b-badge>
        </div>
        <div v-if="isLevelTwoPrioeity">
            <b-badge b-tooltip.hover :title="message" variant="info">{{priorityText}}</b-badge>
        </div>
        <div v-if="isLevelThreePrioeity">
            <b-badge b-tooltip.hover :title="message" variant="success">{{priorityText}}</b-badge>
        </div>
        <div v-if="isLevelFourPrioeity">
            <b-badge b-tooltip.hover :title="message" variant="warning">{{priorityText}}</b-badge>
        </div>
        <div  v-if="isLevelFivePrioeity">
            <b-badge b-tooltip.hover :title="message" variant="danger">{{priorityText}}</b-badge>
        </div>
    </div>
</template>
<script>

export default {
    name: "priority",
    props:{
        priority :{
            type : Number,
            require:true
        }
    },
    data() {
        return{
            
        }
    },
    methods:{
        
    },
    computed:{
        isLevelOnePrioeity(){
            if(this.priority == 'MUITO_BAIXA'){
                return true;
            }
            return false;
        },
        isLevelTwoPrioeity(){
            if(this.priority == 'BAIXA'){
                return true;
            }
            return false;
        },
        isLevelThreePrioeity(){
            if(this.priority == 'MEDIA'){
                return true;
            }
            return false;
        },
        isLevelFourPrioeity(){
            if(this.priority == 'ALTA'){
                return true;
            }
            return false;
        },
        isLevelFivePrioeity(){
            if(this.priority == 'MUITO_ALTA'){
                return true;
            }
            return false;
        },
        priorityText : function(){
            switch(this.priority){
                case 'MUITO_BAIXA':
                    this.message = 'Prioridade 1 : Prioridade muito baixa'
                    return 'Muito Baixa'
                case 'BAIXA':
                    this.message = 'Prioridade 2 : Prioridade baixa'
                    return 'Baixa'
                case 'MEDIA':
                    this.message = 'Prioridade 3 : Prioridade média'
                    return 'Média'
                case 'ALTA': 
                    this.message = 'Prioridade 4 : Prioridade alta'
                    return 'Alta'
                case 'MUITO_ALTA':
                    this.message = 'Prioridade 5 : Prioridade muito alta'
                    return 'Muito Alta'
                default :
                    return 'deu ruim';

            }
        },
        message : function(priority){
            switch(this.priority){
                case 'MUITO_BAIXA':
                    return 'Prioridade 1 : Prioridade muito baixa'
                    
                case 'BAIXA':
                    return 'Prioridade 2 : Prioridade baixa'
                    
                case 'MEDIA':
                    return 'Prioridade 3 : Prioridade média'
                    
                case 'ALTA': 
                    return 'Prioridade 4 : Prioridade alta'
                    
                case 'MUITO_ALTA':
                    return 'Prioridade 5 : Prioridade muito alta'
                    
                default :
                    return 'deu ruim';

            }
        }
    }
    
    
    
    
}
</script>
