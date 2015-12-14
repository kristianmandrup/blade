/**
 * Created by jiamiu on 14-6-5.
 */

Binding.registry('a',{
    compose: function(  layer, args, outputRef  ){
      
      //log("i was here");
      //log(args);
      //log(args[0]);
      
        var dom = outputRef.dom,
            id = dom.attr('id') || Binding.generate_id(),
            href = args.pop()
      
        dom.tagName = 'a'
      
        if( !dom.attr('id') ){
            dom.attr('id', id)
        }

        //due to JSTalk RegExp issue
        /*
        if( href.substr(0,6) !== "http:/" || href.substr(0,6) !=="https:"){
            href = 'http:\/\/' +href
        }
        */

        dom.attr('href', href)

        var style = {
            comment : "dynamically generated for tag a",
            style : {}
        }
        style.style['#'+id] = {}
        style.style['#'+id+":hover"] = {}

        

        
        if( Binding.get_kind( layer ) == 'Text' ){
          
            dom.innerHTML = layer.stringValue()
            Binding.domGenerators['Text'].css( dom, layer )
          
        }
        

        // set position for text
        dom.style['cursor'] = 'pointer'
        dom.style['text-decoration'] = 'none'        
        outputRef.dom = dom
    },
    //we will take the children from here
    stopAutoApplyBindingForChildren : false
})