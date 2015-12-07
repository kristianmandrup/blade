

Binding.registry('mobile-scale',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            scale = args.pop()
      
        dom.data('mobile-scale', scale)  
        outputRef.dom = dom
      
    }
})
