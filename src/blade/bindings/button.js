/**
 * Created by jiamiu on 14-5-19.
 */

/**
 * Created by jiamiu on 14-6-5.
 */

Binding.registry('btn',{
    compose: function(  layer, args, outputRef  ){
        var dom = outputRef.dom,
            layers = [layer layers],
            id,textPosition={},rectPosition={}
        
        if (args) var radius = args.pop();
        

        if( dom.attr('id') ){
            id = dom.attr('id')
        }else{
            id = Binding.generate_id()
            dom.attr('id', id)
        }

        dom.tagName = 'button';
        dom.attr('type','text')

        var style = {
            comment : "dynamically generated for button",
            style : {}
        }
        style.style['#'+id] = {}
        style.style['#'+id+":hover"] = {}

        Util.each( layers, function( subLayer){

            var bindings = Binding.get_bindings(subLayer.name()),
                fakeDom

            fakeDom = Dom.create('div')

            if( Binding.get_kind( subLayer) == 'Text'){
                //use generator to help use with css
                Binding.domGenerators['Text'].css( fakeDom, subLayer )

                if( !dom.innerHTML ){
                    dom.innerHTML = subLayer.stringValue()
                }

            }else if( Binding.get_kind(subLayer) == 'Rectangle'){
              
                
                Binding.domGenerators['Rect'].css( fakeDom, subLayer )

                outputRef.styles.push( style )

                if( !rectPosition.x ){
                    rectPosition.x = subLayer.absoluteRect().rulerX()
                    rectPosition.y = subLayer.absoluteRect().rulerY()
                }

                
                
                
                var borders = subLayer.style().borders().array(),
                    fills = subLayer.style().fills().array(),
                    shadows = subLayer.style().shadows(),
                    innerShadows = subLayer.style().innerShadows()
                
                fakeDom.style['border'] = 'none';
                if (radius !== undefined) fakeDom.style['border-radius'] = radius;
                
                if( borders.count() == 1 && borders.objectAtIndex(0).isEnabled()){
                    fakeDom.style['border'] = borders.objectAtIndex(0).thickness() +"px solid " + Util.toRGBA( borders.objectAtIndex(0).color() )
                }
                if( fills.count() > 0 ){
                    var backgrounds = []
                  Util.each( fills, function(fill){
                
                        if( fill.isEnabled() == 1 ){
                          if (fill.fillType() == 4) {
                              log(fill.image());
                          
                              [outputRef,fakeDom] = handler_export_bg(subLayer, outputRef, fakeDom)
                        
                          } else {
                            backgrounds.push( Util.toRGBA( fill.color()))                        
                          }
                        }
                    })
                    backgrounds.length && ( fakeDom.style['background'] = backgrounds.join(',') )
                }
            
                
                
            }

            Util.extend(style.style['#'+id+(bindings['hover']?':hover':'')] , fakeDom.style)

        })

        // set position for text
        dom.style['padding-top'] = String(textPosition.y - rectPosition.y) + 'px'
        dom.style['padding-left'] = String(textPosition.x - rectPosition.x) + 'px'
        dom.style['box-sizing'] = 'border-box'
        dom.style['cursor'] = 'pointer'
        dom.style['display'] = 'inline-block'
        outputRef.dom = dom
    },
    //we will take the children from here
    stopAutoApplyBindingForChildren : true
})

