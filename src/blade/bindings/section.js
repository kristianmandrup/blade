Binding.registry('section',{
    compose: function(  layer, args, outputRef  ){      
      var dom = outputRef.dom,
          layers = [layer layers]
      
      dom.tagName = 'section'
      dom.attr('class',"wide");
      dom.style = {};
      //dom.style.width =  layer.absoluteRect().width().toFixed(0);
      //dom.style.height =  layer.absoluteRect().height().toFixed(0);
      //dom.style.top = (layer.absoluteRect().rulerY() - layer.parentGroup().absoluteRect().rulerY()).toFixed(0)
      
      
      
      Util.each( layers, function( subLayer ){
        
          if( subLayer.name() == 'background'){
            
            var borders = subLayer.style().borders().array(),
                fills = subLayer.style().fills().array(),
                shadows = subLayer.style().shadows(),
                innerShadows = subLayer.style().innerShadows()

            if( borders.count() == 1 && borders.objectAtIndex(0).isEnabled()){
                dom.style['border'] = borders.objectAtIndex(0).thickness() +"px solid " + Util.toRGBA( borders.objectAtIndex(0).color() )
            }
            if( fills.count() > 0 ){
                var backgrounds = []
                Util.each( fills, function(fill){
                    if( fill.isEnabled() == 1 ){
                        backgrounds.push( Util.toRGBA( fill.color()))
                    }
                })
                backgrounds.length && ( dom.style['background'] = backgrounds.join(',') )
            }
            

            
            
            
          } else if (subLayer.name() == 'Background Image') {
            [outputRef,dom] = handler_export_bg(subLayer, outputRef, dom)
            
          } else {
            Binding.apply_bindings( subLayer, outputRef )
          }
      });
      
      
      
      
      
      outputRef.dom = dom
    },
    stopAutoApplyBindingForChildren : true
});