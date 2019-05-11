Vue.directive('clickoutside',{
  bind:function(el,binding,vnode){
    console.log(el);
    console.log(binding.modifiers);
    console.log(binding.expression);
    console.log(binding.value);
    function documenthandler(e){
      // console.log(e);
      if(el.contains(e.target)){
        return false;//注意
      }
      if(binding.expression){//判断当前指令v-clickoutside有没有写表达式，表达式应该是一个函数，在过滤了内部元素后，点击外面任何区域应该执行用户表达式中的函数，binding.value()就是用来执行当前上下文methods中指定的函数的
        binding.value();//???
      }
    }
    function documentKeyhandler(e){
      // console.log(e);
      if(binding.modifiers.esc)
      {
        if(e.keyCode != 27){
          return false;//注意
        }
        if(binding.expression){//判断当前指令v-clickoutside有没有写表达式，表达式应该是一个函数，在过滤了内部元素后，点击外面任何区域应该执行用户表达式中的函数，binding.value()就是用来执行当前上下文methods中指定的函数的
          binding.value();//???
        }
      }
    }
    //与vue.1x不同 在自定义指令之不能再用This.xxx的形式在上下文中声明一个变量，所以用了 el.__vueClickOutside__引用了documentHandler  这样就可以在unbind钩子里移除对document的click事件的监听，如果不移除当组件火元素销毁时，它仍然存在于内存中
    el.__vueClickOutside__ = documenthandler;
    el.__vueKeyESC__ = documentKeyhandler;
    document.addEventListener('click',documenthandler);
    document.addEventListener('keyup',documentKeyhandler);
  },
  unbind:function(el , binding){
    document.removeEventListener('click',el.__vueClickOutside__);
    document.removeEventListener('click',el.__vueKeyESC__);
    delete el.__vueClickOutside__;
  },
  update:function(){

  }
})
