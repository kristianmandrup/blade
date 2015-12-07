
Binding.registry('mobilewidth',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            mw = args.pop()
        dom.data({'mobile-width': mw});        
        outputRef.dom = dom
      
    }
})
