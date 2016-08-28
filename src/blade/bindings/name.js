
Binding.registry('name',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            name = args.pop()
      dom.attr('name', name); 
      outputRef.dom = dom
      
    }
})

