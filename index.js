var app = new Vue({
  el:'#app',
  data:{
    show:false,
  },
  methods:{
    handleClose:function(){
      this.show = false;
    },
    handleKey:function(){
      if(event.keyCode === 27){
        this.show = false;
      }
    }
  }
})
