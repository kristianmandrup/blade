
Binding.registry('tag',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            tag = args.pop()
      dom.tagName = tag; 
      
      if (tag == 'hidden') {
        dom.tagName = 'input'; 
        dom.attr('type', 'hidden')
        dom.attr('value', layer.stringValue())
        dom.style = null;
        dom.attr('class',null);
      }     
      
      
            
      outputRef.dom = dom
      
    }
})

