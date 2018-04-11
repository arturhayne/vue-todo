var vm = new Vue({
  el: '#app',
  data: function(){
    return {
      message: 'Hello Vue.js!',
      descricao: '',
      tarefas: [],
      edit:false,
      indexEdicao:undefined,
      element:undefined
    }
  },
   methods:{
     addTarefa(de){
        this.tarefas.push({descricao: de,status:"aberta"});
        this.descricao = '';
     },
     removeTarefa(index){
        this.tarefas.splice(index, 1);
     },
     alterarStatus(index){
      if(this.tarefas[index].status==="aberta"){
        this.tarefas[index].status = "fechado";
      }else{
        this.tarefas[index].status = "aberta";
      }
    },

    alterarTelaEdicao(index){
        this.descricao = this.tarefas[index].descricao;
        this.edit = !this.edit;
        this.indexEdicao = index;
    },

    editar(){
        this.edit = false;
        if(this.tarefas[this.indexEdicao]===undefined){
          alert("apagou o item hein seu sapeca!");
          this.descricao = "";
          return;
        }
        if(this.indexEdicao!==undefined){
          this.tarefas[this.indexEdicao].descricao = this.descricao;
          this.descricao = "";
        }
    }

   }
});


