/**
 * Created by jiamiu on 14-5-21.
 */

Binding.registry('default',function(  layer, args, outputRef  ){
    //we do nothing!
  
  var dom = outputRef.dom;
    //dom.attr('class',layer.name().replace(' ','_').toLowerCase());
    //dom.addClass(layer.name().replace(' ','_').toLowerCase());
    
      
    outputRef.dom = dom
  
});