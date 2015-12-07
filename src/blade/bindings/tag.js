
Binding.registry('tag',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            tag = args.pop()
      dom.tagName = tag;      
      outputRef.dom = dom
      
    }
})

