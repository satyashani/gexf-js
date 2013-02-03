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
    urlHtmllinks: 'gexfLinks.php',
    urlJsonLinks: 'gexfLinks.php?json=true',
    urlOrgJsonFiles: '/json',
    urlOrgGexf: 'cp2/wordtree_org_topical/',
    linkboxSelector: 'ul#gexflinks',
    loadLinksFromHtml: function(){
        $.ajax({
            url: loader.urlHtmlLinks,
            success: function(data){
                var lb = $(loader.linkboxSelector);
                lb.empty().append($(data));
                $('.gexflink').unbind('click').click(GexfJS.mapFromLink);
            }
        })
    },
    
    loadLinksFromJson: function(){
        $.ajax({
            url: loader.urlJsonLinks,
            dataType: 'json',
            success: function(data){
                var lb = $(loader.linkboxSelector);
                lb.empty();
                var li = {},a={};
                for(var i in data){
                    li = $('<li></li>');
                    lb.append(li);
                    a = $("<a href='./"+data[i].file+"' class='gexflink btn'>"+data[i].displayname+"</a>")
                    li.append(a);
                }
                $('.gexflink').unbind('click').click(GexfJS.mapFromLink);
            }
        })
    },
    
    loadLinksFromDirListing: function(){
        $.ajax({
            url: loader.urlOrgJsonFiles,
            success: function(data){
                var links = $(data).find('a[href~="json"]');
                var lb = $(loader.linkboxSelector);
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
                url: loader.urlOrgGexf+href,
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