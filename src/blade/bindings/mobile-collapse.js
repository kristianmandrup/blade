

Binding.registry('mobile-collapse',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            w = args.pop()

        if (!layer.name().match(/centering/)) {
          dom.data('left', layer.absoluteRect().rulerX().toFixed(0));          
        }

      
        dom.data('width', layer.absoluteRect().width().toFixed(0));
        dom.data('mobile-collapse', w);
        
        outputRef.dom = dom;
      
    }
})
