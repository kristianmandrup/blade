
Binding.registry('class',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            cls = args.pop()
        dom.addClass(cls);        
        outputRef.dom = dom
      
    }
})
