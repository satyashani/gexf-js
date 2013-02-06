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


Load = {
    urlHtmllinks: 'gexfLinks.php',
    urlJsonLinks: 'gexfLinks.php?json=true',
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
            url: Load.urlHtmlLinks,
            beforeSend: Load.showLoading,
            success: function(data){
                var lb = $(Load.linkboxSelector);
                lb.empty().append($(data));
                $('.gexflink').unbind('click').click(GexfJS.mapFromLink);
                Load.hideLoading();
            }
        })
    },
    
    loadLinksFromJson: function(){
        $.ajax({
            url: Load.urlJsonLinks,
            dataType: 'json',
            beforeSend: Load.showLoading,
            success: function(data){
                var lb = $(Load.linkboxSelector);
                lb.empty();
                var li = {},a={};
                for(var i in data){
                    li = $('<li></li>');
                    lb.append(li);
                    a = $("<a href='./"+data[i].file+"' class='gexflink btn'>"+data[i].displayname+"</a>")
                    li.append(a);
                }
                $('.gexflink').unbind('click').click(GexfJS.mapFromLink);
                Load.hideLoading();
            },
            error: function(jxr,s,e){
                console.log(s+" error: "+e);
            }
        })
    },
    
    loadLinksFromDirListing: function(){
        $.ajax({
            url: Load.urlOrgJsonFiles,
            beforeSend: Load.showLoading,
            success: function(data){
                var links = $(data).find('a[href$="json"]');
                var lb = $(Load.linkboxSelector);
                lb.empty();
                $('.gexflink').unbind('click')
                var li = {};
                links.each(function(){
                    li = $('<li></li>');
                    lb.append(li);
                    $(this).text($(this).text().replace('.json',''));
                    li.append($(this));
                    $(this).addClass('gexflink btn').click(Load.loadGexfFromJson);
                })
                Load.hideLoading();
            }
        })
    },
    
    loadGexfFromJson: function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        if(href.indexOf(".json")!=-1){
            $.ajax({
                url: Load.urlOrgGexf+href,
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