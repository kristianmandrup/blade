

Binding.registry('mobile-float',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            flt = args.pop()
        dom.data('mobile-float',flt);
        outputRef.dom = dom
      
    }
})
