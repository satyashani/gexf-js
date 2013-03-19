/*** USE THIS FILE TO SET OPTIONS ***/

setconf = function(conf){
    if(conf.YH)
        $.extend(YH,conf.YH);
    if(conf.FR)
        $.extend(FR,conf.FR);
    if(conf.loader)
        $.extend(Load,conf.loader);
    Load.loadMethod();
}

$(document).ready(function(){
    
var config = {
    YH : {
        CA: 10,      //Importance of attractive force constant, higher = more attraction
        CR: 2,      //Importance of repulsive force constant, higher = more replusion
        step:100,    // Step by which nodes are converges(~pixels)
        tol:0.001       //tolerance - lower will increase convergence time but improve convergence result
    },
    FR: {
        k : 1,  //force constant, higher=more repulsion, less attraction
        coef: 1 //coefficient of k
    },
    loader:{
        loadMethod: Load.loadLinksFromJson,
        urlJsonLinks: 'gexfLinks.php?json=true',
        urlOrgJsonFiles: 'http://djotjog.com/json',
        urlOrgGexf: 'http://djotjog.com/cp2/wordtree_org_topical/'
    }
}
    setconf(config);
    GexfJS.init({
        graphFile : "data/miserables.gexf",
        showEdges : true,
        developer: false,
        useLens : false,
        zoomLevel : -1,
        curvedEdges : true, 
        edgeWidthFactor : 0.1, // Higher = wider edges
        //Thinnest and thickest edges and smallest and largest nodes, in pixels
        minEdgeWidth : 10,
        maxEdgeWidth : 50,
        minNodeSize  : 5,
        maxNodeSize  : 20,
        nodeSizeFactor : 1,
        mainDivTop : $("#titlebar").height() + "px",
        replaceUrls : true,
            /*
                Enable the replacement of Urls by Hyperlinks
            */
        showEdgeWeight : true,
        language: false, // ISO language code- Available lang English [en], French [fr], Spanish [es],
                         // Italian [it], Finnish [fi], Turkish [tr] and Greek [el].
        useLayout : true, //use a layout algo, set the relevant class too as below
        layoutClass : YH, //YH for yifan hu, FR for Fruchterman rheingold
        messageShow : msg.show,
        messageHide : msg.hide
    });
})