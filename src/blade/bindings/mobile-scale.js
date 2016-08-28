

Binding.registry('mobile-scale',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            scale = args.pop()
      
        dom.data('width', layer.absoluteRect().width().toFixed(0));
        dom.data('left', layer.absoluteRect().rulerX().toFixed(0));
        dom.data('mobile-scale', scale);
      
        outputRef.dom = dom
      
    }
})
