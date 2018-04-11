
Vue.component('painel', {
  template: '#painel',
  props:{
    titulo: {
      type: String,
      required: true,
    }
  },
});

Vue.component('lista', {
  template: '#lista',
  props: {


    tarefas: {
      type: Array,
    }},
  computed: {
  	hasSlotParticipantes() {
    	return this.$slots.blocoTarefas;
    },
  },
  methods:{
    editar(tarefa){
      this.$emit('edit-solicit',tarefa);
    },
    deleteT(tarefa){
      this.$emit('delete-solicit',tarefa);
    },
    alterarStatus(tarefa){
      this.$emit('alt-status-solicit',tarefa);
    },

  }
});

var vm = new Vue({
  el: "#app",
  data() {
    return {
      tarefa: {},
      tarefas: [],
      seed: [
        "Estudar o código",
        "Componentizar App Todo",
        "Apresentar resultado"
      ],
      estaEditando: false
    };
  },
  computed: {
    tarefasConcluidas() {
      return _.filter(this.tarefas, tarefa => {
        return tarefa.finalizada === true;
      });
    },
    tarefasAbertas() {
      return _.filter(this.tarefas, tarefa => {
        return tarefa.finalizada === undefined || tarefa.finalizada === false;
      });
    }
  },
  created() {
    this.tarefas = _.map(this.seed, descricao => {
      return this.constuirTarefa({ descricao });
    });
  },
  watch: {
    tarefas: {
      handler(valorNovo, valorAntigo) {
        console.log('Auditoria tarefas modificada - situação anterior:', valorAntigo);
        console.log('Auditoria tarefas modificada - situação atual:', valorNovo);
      },
      deep: true
    },
  },
  methods: {
    salvar() {
      if (!this.tarefa.id) {
        this.tarefas.push(this.constuirTarefa(this.tarefa));
      } else {
        var tarefaEncontrada = this.getTarefaPorId(this.tarefa.id);
        Object.assign(tarefaEncontrada, this.tarefa);
      }

      this.limparFormulario();
    },
    limparFormulario() {
      this.tarefa = {};
      this.estaEditando = false;
    },
    preararParaEditarTarefa(tarefa) {
      this.tarefa = _.cloneDeep(tarefa);
      this.estaEditando = true;
    },
    finalizarTarefa(tarefa) {
      tarefa.finalizada = true;
    },
    removerTarefa(tarefa) {
      this.tarefas.splice(this.getIndexPorId(tarefa.id), 1);
    },
    getIndexPorId(idTarefa) {
      return _.findIndex(this.tarefas, { id: idTarefa });
    },
    getTarefaPorId(idTarefa) {
      return _.find(this.tarefas, { id: idTarefa });
    },
    cancelaEdicao() {
      this.limparFormulario();
    },
    constuirTarefa(data) {
      return Object.assign({ id: _.uniqueId(), finalizada: false }, data);
    },
    imprimir() {
      console.log('mandou imprimir');
    },

  }
});
