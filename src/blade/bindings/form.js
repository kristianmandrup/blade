Binding.registry('form',{
    compose: function(  layer, args, outputRef  ){      
      var dom = outputRef.dom,
          layers = [layer layers],
            action = args.pop()
          
      dom.tagName = 'form'
      dom.attr('method', 'POST' );
      dom.attr('action', action );
      
      [dom, outputRef] = Util.move_styles_to_sheet(dom, outputRef);
      
      outputRef.dom = dom
    },
    
    
    //we will take the children from here
    //stopAutoApplyBindingForChildren : true
})