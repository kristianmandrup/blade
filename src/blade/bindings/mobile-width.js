

Binding.registry('mobile-width',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            w = args.pop()
        dom.data('width', layer.absoluteRect().width().toFixed(0));
        dom.data('mobile-width', w);
        outputRef.dom = dom;
      
    }
})
