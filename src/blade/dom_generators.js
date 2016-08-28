/**
 * Created by jiamiu on 14-5-21.
 */

function handler_export( layer, outputRef){
    var dom = Dom.create('img'),
        filename = Config.images_folder + "/" + Util.uniq( Binding.sanitize_filename(layer.name()) ),
        ext = Config.export_img_ext
  
        if (layer.name().match(/\.jpg$/)) { ext = ""    }
        var src = filename.replace(Config.target_folder+"/",'') + ext

  

    dom.attr('src', src)
    outputRef.exportFiles.push( {layer : layer, target : filename+ext})
    return dom
}

function handler_export_bg( layer, outputRef, dom, isPattern){
  
      var filename = Config.images_folder + "/" + Util.uniq( Math.random().toString(36).substr(2, 5) + Binding.sanitize_filename(layer.name()) ),
        ext = Config.export_img_ext
  
        if (layer.name().match(/\.jpg$/)) { ext = ""    }
        
        var src = filename.replace(Config.target_folder+"/",'') + ext
    
    if (isPattern) {
      dom.style['background-repeat'] = 'repeat';
      dom.addClass('bg-pattern');
    } else {
      dom.addClass('bg-image');      
    }
    dom.style['background'] = "url('" + src +"')";
    outputRef.exportFiles.push( {layer : layer, target : filename+ext, isPattern: isPattern})
    
    return [outputRef, dom]
}



Binding.register_dom_generator('LayerGroup',function(layer, outputRef){
    outputRef.dom =  Dom.create('div')
    Binding.setup_rect_for_dom( outputRef.dom, layer )

})

Binding.register_dom_generator('Text',{
    dom :function(layer, outputRef){

        var needExport = false
        if( layer.style().borders().array().count() !== 0
            || layer.style().fills().array().count()
            ){
            needExport = true
        }


        if( !needExport ){
            var dom = Dom.create('p')
            //TODO browsers has different strategy to calculate the width of space with Sketch.
            dom.innerHTML = layer.stringValue()
        }else{
            var dom = handler_export(layer, outputRef)
        }

        Binding.setup_rect_for_dom( dom, layer )
          
          
        outputRef.dom = dom



    },
    css :function(dom, layer){
      
      
      
        
      
        if( dom.tagName == 'img' ) return
          
        Util.extend( dom.style,{
            "font-size" : layer.fontSize().toFixed(0) -1,
            "letter-spacing" : layer.characterSpacing().toFixed(1),
            "line-height" :  layer.lineSpacing().toFixed(0) + 'px'
        });
        
        
        dom.addClass('text');
        
        dom.style['color'] = layer.textColor().stringValueWithAlpha(true);
        dom.style['opacity'] = layer.style().contextSettings().opacity().toFixed(2);
        
        /*
        dom.style['color'] = 'rgba(' + String(layer.textColor()).replace(/[\(\)]/g,'').split(' ').map(function(v){
            var t = v.split(":"),type = t[0],value=t[1]
            if( type !== 'a' ){
                return Math.round( Number(value) * 256)
            }
            return Number(value)
        }).join(',')+')'
        */
        
        var align = ['left','right','center','justify']
        dom.style['text-align'] = align[layer.textAlignment()] ? align[layer.textAlignment()] : 'inherit'

        //fix browser and Sketch line-height diffrence
        //dom.style['margin-top'] = (parseInt( dom.style['line-height'] ) - parseInt( layer.fontSize() ) ) + "px"

        dom.style['white-space'] = 'pre-line'
        //dom.style['word-break'] = 'keep-all'
 
        //NOT SUPPORT font-style NOW
        var font = layer.font()
        dom.style['font-family'] = "'"+font.familyName()+"'"        
        dom.style['font-weight'] = Number(Util.fontWeight( font) - 2 ) *100

        //TODO: deal with font fill
        
        
        if (dom.tagName == 'title') dom.style = {};
        

    }
})

//due to Sketch api issue, we can not generate div for every Rectangle
Binding.register_dom_generator('Rect',{
    dom:function(layer, outputRef){
        //Rectangle is the shape which will not export as a image but generate a div.

        var needExport = false,
            borders = layer.style().borders().array(),
            fills = layer.style().fills().array(),
            i= 0,fillsCount = fills.count(),
            dom

        if( borders.count() > 1 ){
            Util.log("borders count > 1")
            needExport = true
          
        }

        for( ;i<fillsCount; i++){
            if( fills[i].fillType == 4  ){
                Util.log("fillType == 4")

                needExport= true;
                break;
            }
        }

        if( needExport ){
            dom = handler_export(layer, outputRef)

        }else{
            dom = Dom.create('div')
        }

        Binding.setup_rect_for_dom( dom, layer )
        
        outputRef.dom = dom
    },
    css : function(dom, layer) {
        if( dom.tagName == "img") return

        var borders = layer.style().borders().array(),
            fills = layer.style().fills().array(),
            shadows = layer.style().shadows(),
            innerShadows = layer.style().innerShadows()

        if( borders.count() == 1 && borders.objectAtIndex(0).isEnabled()){
            dom.style['border'] = borders.objectAtIndex(0).thickness() +"px solid " + Util.toRGBA( borders.objectAtIndex(0).color() )
        } else {
          dom.style['border-style'] = 'none';          
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

        if( shadows.count() + innerShadows.count() > 0 ){
            var shadowStyles = []
            Util.each( shadows, function( shadow){
                if( !shadow.isEnabled() ) return

                shadowStyles.push(
                        [shadow.offsetX(),shadow.offsetY(),shadow.blurRadius(),shadow.spread()].map(function(i){
                            return i+"px"
                        }).join(' ') + " " + Util.toRGBA( shadow.color())
                )
            })

            Util.each( innerShadows, function( innerShadow){
                if( !innerShadow.isEnabled() ) return ;

                shadowStyles.push(
                        "inset " + [innerShadow.offsetX(),innerShadow.offsetY(),innerShadow.blurRadius(),innerShadow.spread()].map(function(i){
                        return i+"px"
                    }).join(' ') + " " + Util.toRGBA( innerShadow.color())
                )
            })
            shadowStyles.length && ( dom.style['box-shadow'] = shadowStyles.join(','))
        }
    }
})

Binding.register_dom_generator('Bitmap1',function(layer,outputRef){
    var dom = handler_export(layer, outputRef)


    Binding.setup_rect_for_dom( dom, layer )
    outputRef.dom = dom
})


Binding.register_dom_generator('default',function(layer,outputRef){
    var dom = handler_export(layer, outputRef)

    Binding.setup_rect_for_dom( dom, layer )
    outputRef.dom = dom
})
