

Binding.registry('mobile-hide',{
    compose: function(  layer, args, outputRef  ){
      var dom = outputRef.dom;
      dom.addClass('mobile-hide');
      
      outputRef.dom = dom;
      
    }
})



Binding.registry('mobile-only',{
    compose: function(  layer, args, outputRef  ){
      var dom = outputRef.dom;
      dom.addClass('mobile-only');
      outputRef.dom = dom;
      
    }
})
