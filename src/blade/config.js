/**
 * Created by jiamiu on 14-5-19.
 */

var Config = Config || (function(){

    var document_path = [[doc fileURL] path].replace( /\/[^\/]+\.sketch$/,'\/'),
        document_name = [doc displayName].replace(".sketch",""),
        target_folder = document_path + document_name,
        home_folder = "/Users/" + NSUserName(),
        images_folder = target_folder + "/images",
        css_folder = target_folder + "/css",
        js_folder = target_folder + "/js",
        plugin_folder = sketch.scriptPath.replace(/\/blade.sketchplugin$/,'')


    return {
        document_path : document_path,
        document_name : document_name,
        target_folder : target_folder,
        images_folder : images_folder,
        home_folder : home_folder,
        js_folder : js_folder,
        css_folder : css_folder,
        plugin_folder : plugin_folder,
        global_scripts : [
/*          {
            comment : 'minified',
            origin : plugin_folder + '/blade/lib/minified.js',
            src : js_folder + '/minified.js'
          },*/
          {
            comment : 'app',
            origin : plugin_folder + '/blade/lib/app.js',
            src : js_folder + '/app.js'
          }
        ],
        global_styles : [
          {
            comment : 'global reset',
            origin : plugin_folder + '/blade/lib/reset.css',
            href : css_folder + '/reset.css'
          },
          {
            comment : 'fonts',
            origin : plugin_folder + '/fonts/stylesheet.css',
            href : '/fonts/stylesheet.css'
          }          
        ],
        export_img_ext : ".png",
        show_error : true

    }
})()

