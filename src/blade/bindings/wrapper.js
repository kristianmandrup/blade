Binding.registry('wrapper',{
    compose: function(  layer, args, outputRef  ){      
      var dom = outputRef.dom,
          layers = [layer layers]
      
      dom.id = "wrapper";
      dom.attr('class','wrapper');
      dom.style = null;
      
      outputRef.dom = dom
      
    },
    
    
    //we will take the children from here
    //stopAutoApplyBindingForChildren : true
})