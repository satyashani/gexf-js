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
    urlHtmllinks: 'http://djotjog.com/gexf-web/gexfLinks.php',
    urlJsonLinks: 'http://djotjog.com/gexf-web/gexfLinks.php?json=true',
    urlOrgJsonFiles: 'http://djotjog.com/json',
    urlOrgGexf: 'http://djotjog.com/cp2/wordtree_org_topical/',
    linkboxSelector: 'ul#gexflinks',
    showLoading: function(){
        $('#loadinggif').show();
    },
    hideLoading: function(){
        $('#loadinggif').hide();
    },
    loadLinksFromHtml: function(){
        $.ajax({
            url: loader.urlHtmlLinks,
            beforeSend: loader.showLoading,
            success: function(data){
                var lb = $(loader.linkboxSelector);
                lb.empty().append($(data));
                $('.gexflink').unbind('click').click(GexfJS.mapFromLink);
                loader.hideLoading();
            }
        })
    },
    
    loadLinksFromJson: function(){
        $.ajax({
            url: loader.urlJsonLinks,
            dataType: 'json',
            beforeSend: loader.showLoading,
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
                loader.hideLoading();
            }
        })
    },
    
    loadLinksFromDirListing: function(){
        $.ajax({
            url: loader.urlOrgJsonFiles,
            beforeSend: loader.showLoading,
            success: function(data){
                var links = $(data).find('a[href$="json"]');
                var lb = $(loader.linkboxSelector);
                lb.empty();
                $('.gexflink').unbind('click')
                var li = {};
                links.each(function(){
                    li = $('<li></li>');
                    lb.append(li);
                    $(this).text($(this).text().replace('.json',''));
                    li.append($(this));
                    $(this).addClass('gexflink btn').click(loader.loadGexfFromJson);
                })
                loader.hideLoading();
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
                        GexfJS.loadAndDrawGraph("http://"+data.file);
                    }
                }
            })
        }
    }
}