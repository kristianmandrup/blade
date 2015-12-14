


function export_as_img( layer, filename, isPattern ){
  // Actual writing of asset
  var slice,
    rect = [layer absoluteDirtyRect]
  log(rect);
  
   slice = [[MSSliceMaker slicesFromExportableLayer:layer inRect:[layer absoluteDirtyRect]] firstObject]
   //slice = [[MSSliceMaker slicesFromExportableLayer:layer] firstObject]
  
  
   //slice = [MSSliceMaker sliceFromExportSize:1 layer: layer inRect:[layer absoluteDirtyRect]]
    slice.page = [[doc currentPage] copyLightweight]
    if (layer.name().match(/\.jpg$/)) {
      slice.format = "jpg"    
    } else {
      slice.format = "png"    
    
    }
    if (!isPattern) slice.scale = 2
    else slice.scale = 1;
  
  

//  Util.log("— writing asset " + slice + " to disk: " + filename)
  var imageData = [MSSliceExporter dataForRequest:slice]
  [imageData writeToFile:filename atomically:true]

}



function output( processResult ){

    //1. Create folders
    if( Util.folder_exist( Config.target_folder) ){
        Util.remove_folder( Config.target_folder)
    }
    Util.create_folders(
        [NSArray arrayWithObjects:
            Config.target_folder,Config.images_folder,Config.js_folder,Config.css_folder,nil])

    //2. Save inline script as single file
    // Single script structure : {comment:"",src:"",script:""}
    var scriptStr = "", scripts = Config.global_scripts.concat(processResult.scripts), scriptsCache={}
    Util.log( 'scripts length:' + scripts.length)
    Util.each( scripts, function(scriptObj){
        if( scriptObj.src && !scriptsCache[scriptObj.src]){
            var src = scriptObj.src.replace(Config.target_folder+'/',''),
                scriptNode = Dom.create('script').attr('src',src)
            processResult.dom.append(scriptNode)

            if( scriptObj.origin ){
                Util.copy( scriptObj.origin, scriptObj.src )
            }
            scriptsCache[scriptObj.src] = true
        }else{
            scriptStr += ['/* '+scriptObj.comment+' */',Util.script_to_string(scriptObj.script),''].join('\n')
        }
    })

    if( scriptStr ){
        var scriptSrc = Config.target_folder + "/index.js"
        processResult.dom.append( Dom.create('script').attr('src', 'index.js' ) )
        Util.save_file_from_string( scriptSrc, scriptStr);
    }

    //3. Save css as single file
    // Single style structure: {comment:"",href:"",style:{name:value}}
    var styleStr = "", styles = Config.global_styles.concat( processResult.styles),stylesCache = {}
    Util.each( styles, function(styleObj){
        if( styleObj.href && !scriptsCache[styleObj.href] ){
            var href = styleObj.href.replace( Config.target_folder+'/',''),
                linkDom = Dom.create('link').attr('href',href).attr('type','text/css').attr('rel','stylesheet')
            processResult.dom.prepend(linkDom)

            if( styleObj.origin ){
                Util.copy( styleObj.origin, styleObj.href )
            }
            stylesCache[styleObj.href] = true
        }else{
            styleStr += ['/* '+styleObj.comment+' */', Util.style_to_string(styleObj.style) ,''].join('\n')
        }
    })
    if( styleStr ){
        var styleSrc = Config.target_folder + "/index.css"
        processResult.dom.append(
            Dom.create('link').attr('href','index.css').attr('type','text/css').attr('rel','stylesheet'))

        Util.save_file_from_string( styleSrc, styleStr);
    }

    //4. Export images
    if( processResult.exportFiles ){
        Util.each( processResult.exportFiles, function( fileObj ){
//            Util.log("exporting "+fileObj.target)
          log(fileObj);
          
          if(fileObj.isPattern){ doc.currentPage().addLayers([fileObj.layer]) } 
            export_as_img( fileObj.layer, fileObj.target, fileObj.isPattern)            
          if(fileObj.isPattern) { fileObj.layer.removeFromParent()}
          
        })
    }

    processResult.dom.prepend(
      Dom.create('meta').attr('charset','utf-8'));
    
    processResult.dom.prepend(
        Dom.create('link').attr('href','https://fonts.googleapis.com/css?family=PT+Serif').attr('type','text/css').attr('rel','stylesheet'))
      
    processResult.dom.prepend(
      //initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,
      Dom.create('meta').attr('name','viewport').attr('content','width=device-width, initial-scale=1,  maximum-scale=1')
    );

    var html = "<html><head></head>" + processResult.dom.outerHTML + '</html>';

    //5. Save html
    Util.save_file_from_string(Config.target_folder + "/index.html",  html);

}


function main() {
    Util.execute(function() {
        var start = new Date().getTime()

        Util.log("###################")
        Util.log("### blade start ###")
        Util.log("###################")

        //1. Process layers
        var layers = [[doc currentPage] layers],
            processResult
      

        Util.each( layers, function( subLayer ){
            processResult = Binding.apply_bindings( subLayer );
        })

        //2. output files
//        Util.log( processResult.dom.outerHTML )
        output( processResult )

        var end = new Date().getTime()
        Util.log("Time used: " +(end - start))
        Util.log("###################")
        Util.log("###  blade end  ###")
        Util.log("###################")
        [doc showMessage:"Export Complete"]

    })
}

main();