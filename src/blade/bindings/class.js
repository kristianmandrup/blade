
Binding.registry('class',{
    compose: function(  layer, args, outputRef  ){
      var dom = outputRef.dom;
            
      Util.each( args , function(cls){
        dom.addClass(cls);                  
      });
      
      
    }
})
