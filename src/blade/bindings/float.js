

Binding.registry('float',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            flt = args.pop()
        dom.style.float = flt;
        outputRef.dom = dom
      
    }
})
