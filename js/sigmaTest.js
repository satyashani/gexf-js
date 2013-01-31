/************************************************************** 
 * 
 * Date: Jan 19, 2013
 * version: 1.0
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Description:   
 * Javascript interfaces for 
 * Dependencies: 
 * jQuery
 * 
 * ****************************************************************/
var forcerunning = true;
function init() {
// Instanciate sigma.js and customize rendering :
return sigma.init(document.getElementById('zonecentre')).drawingProperties({
defaultLabelColor: '#000',
defaultLabelSize: 14,
defaultLabelBGColor: '#000',
defaultLabelHoverColor: '#009',
labelThreshold: 6,
defaultEdgeType: 'curve'
}).graphProperties({
minNodeSize: 0.05,
maxNodeSize: 5,
minEdgeSize: 0.05,
maxEdgeSize: 1
}).mouseProperties({
maxRatio: 8
});
}
 
function loadNewMap(e){
    e.preventDefault();
    var href = jQuery(this).attr('href');
    console.log(href);
    if(href!=='undefined'){
        sigmaInst.emptyGraph();
        sigmaInst.parseGexf(href);
        sigmaInst.refresh();
        sigmaInst.draw();
        startforce({
            adjustSizes: false,
            complexIntervals: 500,
            simpleIntervals: 1000,
            edgeWeightInfluence: 5,
            scalingRatio: 1,
            gravity: 5,
            jitterTolerance : 0.1,
            barnesHutOptimize: true,
            barnesHutTheta: 1.2,
            speed: 0.5,
            outboundAttCompensation: 1,
//            totalSwinging: 0,
//            totalEffectiveTraction: 10,
//            linLogMode : true,
//            outboundAttractionDistribution: true,
//            strongGravityMode: true,
            maxtime: 10000
        });
        forcerunning=true;
        $('#stopForce').removeClass('icon-play').addClass('icon-pause');
    }
}

function stopforce(){
       forcerunning = false;
       sigmaInst.stopForceAtlas2();
       $('#stopForce').removeClass('icon-pause').addClass('icon-play');
}

function startforce(config){
    forcerunning = true;
    sigmaInst.startForceAtlas2(config);
    $('#stopForce').removeClass('icon-play').addClass('icon-pause');
    if(config.maxtime)
        window.setTimeout(stopforce, config.maxtime);
}

function startstop(e){
    forcerunning?stopforce():startforce();
}


$(document).ready(function(){
    sigmaInst = init();
    $('.gexflink').click(loadNewMap);
    $('#stopForce').click(startstop);
})