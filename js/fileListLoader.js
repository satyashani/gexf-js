/* * ************************************************************ 
 * 
 * Date: Feb 2, 2013
 * version: 1.0
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Description:   
 * Javascript file fileListLoader.js
 * 
 * 
 * *************************************************************** */


var loader = {
    urlJsonFiles: 'json/',
    urlGexfLocation: 'cp2/wordtree_org_topical/',
    linkboxSelector: 'ul#gexslinks',
    loadJsonList: function(){
        $.ajax({
            url: this.urlJsonFiles,
            success: function(data){
                var links = $(data).find('a[href~="json"]');
                var lb = $(this.linkboxSelector);
                lb.empty();
                var li = {};
                links.each(function(){
                    li = $('<li></li>');
                    lb.append(li);
                    li.append(this);
                    this.addClass('gexflink btn');
                })
                $('.gexflink').unbind('click').click(loader.loadGexfFromJson)
            }
        })
    },
    
    loadGexfFromJson: function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        if(href.indexOf(".json")!=-1){
            $.ajax({
                url: loader.urlGexfLocation+href,
                dataType: 'json',
                success: function(data){
                    if(data.success){
                        GexfJS.loadAndDrawGraph(data.file);
                    }
                }
            })
        }
    }
}