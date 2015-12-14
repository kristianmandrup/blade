

Binding.registry('centering',{
    compose: function(  layer, args, outputRef  ){      
      var dom = outputRef.dom,
          zoom = args.pop(),              
          layers = [layer layers]

      
      if ((zoom - parseFloat( zoom ) + 1) >= 0) dom.attr('zoom', zoom);

      dom.tagName = 'div';
      dom.addClass('centering');
      
      //dom.attr("class", 'centering');
      dom.style = {};
      dom.style.width =  layer.absoluteRect().width().toFixed(0);
      dom.style.height =  layer.absoluteRect().height().toFixed(0);
      
      // apply the height from the section
      //var height = layer.parentGroup().absoluteRect().height().toFixed(0); 
      //dom.style['min-height'] =  height;
      //dom.data('height', height);
      
      dom.style['top'] = (layer.absoluteRect().rulerY() - layer.parentGroup().absoluteRect().rulerY()).toFixed(0);     
      
      [dom, outputRef] = Util.move_styles_to_sheet(dom, outputRef);
      
      outputRef.dom = dom
    },
    
    
    //we will take the children from here
    //stopAutoApplyBindingForChildren : true
});


Binding.registry('stacking',{
    compose: function(  layer, args, outputRef  ){      
      var dom = outputRef.dom,
          stackedHeight = args.pop(),                        
          layers = [layer layers]

      dom.addClass('stacking')
      dom.data('stacked-height', stackedHeight);
     
      outputRef.dom = dom
    },
    
    
    //we will take the children from here
    //stopAutoApplyBindingForChildren : true
})